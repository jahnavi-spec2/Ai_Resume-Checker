import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const signToken = (payload) => {
  return jwt.sign(
    payload,
    config.jwtSecret,
    {
      expiresIn: config.jwtExpiry || "10d",
    }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

export const cookieOptions = {
  httpOnly: true,
  secure: config.isProd,
  sameSite: config.isProd ? "none" : "lax",
  maxAge: 10 * 24 * 60 * 60 * 1000,
  path: "/",
};