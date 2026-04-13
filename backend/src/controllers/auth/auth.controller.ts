import {decodeIdToken, generateCodeVerifier, generateState} from "arctic";
import {google} from "../../config/oauth.js";
import type {Request, Response} from "express";
import {User} from "../../models/recruiter/recruiter.model.js";
import {generateAcessToken, generateRefreshToken, verifyRefreshToken} from "../../utils/jwt.js";

// Login route
export const login = async (req: Request, res: Response) => {
    const state = generateState();
    const codeverifier = generateCodeVerifier();
    const scopes = ["profile", "email"];
    const url = await google.createAuthorizationURL(state, codeverifier, scopes);

    //  Store state and codeverifier in cookie for the  callback to use
    res.cookie("google_oauth_state", state, {
        httpOnly: true,
        maxAge: 600000,
        path: "/",
    });

    res.cookie("google_code_verifier", codeverifier, {
        httpOnly: true,
        maxAge: 600000,
        path: "/",
    });

    res.redirect(url.toString());
};

// Define what google return in ID toke
interface googleClaims {
    sub: string;
    name: string;
    email: string;
    picture?: string;
    email_verified: boolean;
}

export const googleCallback = async (req: Request, res: Response) => {
    const {code, state} = req.query;
    const {google_oauth_state: storedState, google_code_verifier: codeVerifier} = req.cookies;

    if (
        typeof code !== "string" ||
        typeof state !== "string" ||
        !code ||
        !state ||
        !storedState ||
        !codeVerifier ||
        state !== storedState
    ) {
        return res.status(400).send("Invalid Request");
    }

    let tokens;
    try {
        tokens = await google.validateAuthorizationCode(code, codeVerifier);
        const claims = decodeIdToken(tokens.idToken());
        const {sub: googleUserId, name, email, picture} = claims as googleClaims;

        let user = await User.findOne({email: email});
        if (!user) {
            //If user not found in DB
            user = await User.create({
                name: name,
                email: email,
                role: "recruiter",
                provider: "google",
                providerId: googleUserId,
                ...(picture && {avatar: picture}), //added if and only if picture is there in users account
            });
        } else {
            // If the user was found by email, but hasn't linked their Google ID yet
            if (!user.providerId) {
                user.providerId = googleUserId;
                await user.save();
            }
        }

        const payload = {userId: googleUserId, email: email, role: "recruiter"};

        const accessToken = generateAcessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            path: "/api/auth/refresh-token", // Only sent to the refresh route
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        })
        
        //  Cleanup and Response
        res.clearCookie("google_oauth_state");
        res.clearCookie("google_code_verifier");

        return res.status(200).json({
            sucess: true,
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Authentication Failed");
    }
    console.log("google token", tokens);
};

//  * REFRESH TOKEN CONTROLLER
//  * This is the "Stay Logged In" engine.
//  * The frontend calls this when the Access Token expires.

export const refreshTokenController = async (req: Request, res: Response) => {
    // Get token from cookies
    const {refreshToken} = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({message: "Refresh token is required"});
    }

    // Verify the refresh token
    try {
        // Verify it
        const decode = verifyRefreshToken(refreshToken);

        // Generate a fresh access token
        const payload = {userId: decode.userId, email: decode.email, role: decode.role};
        const newAccessToken = generateAcessToken(payload);

        return res.json({accessToken: newAccessToken});
    } catch (error) {
        res.status(403).json({message: "Invalid or Expired Refresh Token"});
    }
};

// Dummy profile
export const getUserProfile=async(req:Request,res:Response)=>{
    return res.json({success:true,"message":"hello santu"})
}