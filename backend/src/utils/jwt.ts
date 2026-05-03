import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Token Payload
export interface TokenPayload {
    userId: string;
    email: string;
    role: string;
}

if (!ACCESS_SECRET) {
    throw new Error("ACCESS_SECRET is missing in environment variables");
}

if (!REFRESH_SECRET) {
    throw new Error("REFRESH_SECRET is missing in environment variables");
}

// Create access token
export const generateAcessToken = (payload: TokenPayload) => {
    const token = jwt.sign(payload, ACCESS_SECRET, {
        expiresIn: "60m",
    });
    return token;
};

// Create refresh token
export const generateRefreshToken = (payload: TokenPayload) => {
    const token = jwt.sign(payload, REFRESH_SECRET, {
        expiresIn: "30m",
    });
    return token;
};

// Verify access token
export const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
};

// Verify refersh token
export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
};
