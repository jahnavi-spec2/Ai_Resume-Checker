import { z } from "zod";
//before logic passes to controllers it cheaks g
export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(80, "Name is too long"),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password is too long")
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password is too long")
});