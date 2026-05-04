import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/recruiter/recruiter.model.js';
import { generateAcessToken, generateRefreshToken } from '../utils/jwt.js';
// import { redisClient } from "./redis.js";

const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

if (!client_id || !client_secret || !redirect_uri) {
  throw new Error('Missing OAuth environment variables! Check your .env file.');
}

export const GOOGLE_CLIENT = new OAuth2Client({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

type GoogleUser = {
  sub: string;
  email?: string;
  family_name?: string;
  given_name?: string;
  picture?: string;
  email_verified?: boolean;
};

export interface GoogleLoginResult {
  success: boolean;
  message: string;
  data?: {
    role: string;
    user: {
      firstname: string;
      lastname?: string;
      email: string;
      profilePicture: string;
    };
  };
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

export async function googleLogin(
  payload: GoogleUser
): Promise<GoogleLoginResult> {
  if (payload.given_name === undefined) {
    return {
      success: false,
      message: '`firstname` is not provided',
    };
  }

  if (payload.email === undefined) {
    return {
      success: false,
      message: '`email` is not provided',
    };
  }

  try {
    // Check if the user already exists in MongoDB
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        firstname: payload.given_name,
        lastname: payload.family_name,
        email: payload.email,
        picture: payload.picture || '',
        isActive: true,
      });
    }

    if (!user || !user._id)
      throw new Error('Failed to process user in database');

    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    // Generate the Tokens
    const accessToken = generateAcessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // await redisClient.set(`refresh_token${user._id.toString()}`, refreshToken, {
    //   EX: 30 * 60
    // });
    await user.save();

    // FIX 2 & 3: Cleaned up the return brackets and mapped user.picture to profilePicture
    return {
      success: true,
      message: 'Login successful',
      data: {
        role: user.role,
        user: {
          firstname: user.firstname,
          lastname: user.lastname || '',
          email: user.email,
          profilePicture: user.picture || '', // Maps your DB field to the React interface
        },
      },
      tokens: { accessToken, refreshToken },
    };
  } catch (error) {
    console.error('Database operation failed:', error);
    throw error;
  }
}
