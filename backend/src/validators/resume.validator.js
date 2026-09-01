import {z} from "zod";

export const analyzeSchema=z.object({
    versionId:z.string().min(1,"verisonId is required"),
    targetRole: z.string().trim().optional(),
})