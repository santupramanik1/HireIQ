import {decodeIdToken, generateCodeVerifier, generateState} from "arctic";
import {google} from "../../config/oauth.js";
import type {Request, Response} from "express";

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
interface googleClaims{
    sub:string,
    name:string,
    email:string,
    picture?:string,
    email_verified:boolean

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
        const claims=decodeIdToken(tokens.idToken())
        const {sub:googleUserId,name,email}=claims as googleClaims
        console.log(googleUserId,name,email)
        res.send(`Hello ${name}, you are logged in.`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Authentication Failed");
    }
    console.log("google token",tokens)
};
