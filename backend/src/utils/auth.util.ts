import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET must be provided");
}

export const generateAccessToken = (email: string, uid: string) => {
  return jwt.sign({ email, uid }, secret, {
    expiresIn: "24h",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, secret) as jwt.JwtPayload;
};
