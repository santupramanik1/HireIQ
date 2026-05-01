import type { Request, Response } from "express";
import { GOOGLE_CLIENT, googleLogin } from "../../config/oauth.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code)
      return res
        .status(400)
        .json({ success: false, message: "Authorization code required" });

    // Exchange code for tokens
    const { tokens } = await GOOGLE_CLIENT.getToken(code);
    if (!tokens.id_token)
      return res
        .status(400)
        .json({ success: false, message: "Unable to get tokens" });

    // Verify Identity
    const ticket = await GOOGLE_CLIENT.verifyIdToken({
      idToken: tokens.id_token
    });
    const payload = ticket.getPayload();
    if (!payload)
      return res
        .status(400)
        .json({ success: false, message: "No payload received" });

    const result = await googleLogin(payload);
    if (!result.success || !result.tokens)
      return res.status(401).json({ success: false, message: result.message });

    const isProduction = process.env.NODE_ENV === "production";

    // Set Access Token Cookie (15 mins)
    res.cookie("access_token", result.tokens.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    });

    // Set Refresh Token Cookie (30 mins)
    res.cookie("refresh_token", result.tokens.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 30 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data
    });
  } catch (error: any) {
    if (error.message === "invalid_grant")
      return res.status(400).json({ success: false, message: "Invalid code" });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
