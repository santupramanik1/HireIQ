import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is missing in environment variables");
}
const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, secret, {
    expiresIn: "7d",
  });
};
