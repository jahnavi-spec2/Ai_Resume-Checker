import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
} from "../controllers/auth.controller.js";
import { authLimiter } from "../middleware/rateLimiter.js";
import {
    registerSchema,
    loginSchema
} from "../validators/auth.validator.js";

import verifyJWT from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validator.middleware.js";

const router = express.Router();

router.post("/register", authLimiter, validate(registerSchema),registerUser);

router.post("/login", authLimiter,validate(loginSchema), loginUser);

router.post("/logout", verifyJWT, logoutUser);

router.get("/me", verifyJWT, getCurrentUser);

export default router;