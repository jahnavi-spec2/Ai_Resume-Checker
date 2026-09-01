import { GoogleGenAI } from "@google/genai";
import ApiError from "../utils/ApiError.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeResumeText(resumeText, targetRole = "") {
  const prompt = `
You are an ATS resume analyzer. ${
    targetRole ? `Evaluate this resume for the target role: "${targetRole}".` : "Evaluate this resume generally for ATS-friendliness."
  }
Return ONLY valid JSON, no markdown fences, in exactly this shape:
{
  "score": <integer 0-100>,
  "strengths": ["short phrase", ...],
  "issues": ["short phrase", ...],
  "missingKeywords": ["keyword", ...],
  "rewrites": [{ "original": "weak bullet from resume", "suggestion": "stronger rewrite" }, ...]
}

RESUME:
${resumeText}
`.trim();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  const raw = response.text.trim().replace(/^```json\s*|```$/g, "");

  try {
    return JSON.parse(raw);
  } catch {
    throw ApiError.internal("AI returned an unreadable response, please retry");
  }
}