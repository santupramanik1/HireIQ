import { Google } from "arctic";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;



if (!clientId || !clientSecret || !redirectUri) {
    console.log(clientId,clientSecret,redirectUri)
  // console.log("hello")
    throw new Error("Missing OAuth environment variables! Check your .env file.");
}

export const google = new Google(clientId, clientSecret, redirectUri);
