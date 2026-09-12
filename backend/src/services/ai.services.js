import { GoogleGenAI } from "@google/genai";
import ApiError from "../utils/ApiError.js";

export async function analyzeResumeText(resumeText, targetRole = "") {
  if (!process.env.GEMINI_API_KEY) {
    throw ApiError.internal("GEMINI_API_KEY is not configured in backend environment variables");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const prompt = `
You are an expert ATS (Applicant Tracking System) resume analyzer. ${
    targetRole
      ? `Evaluate this resume specifically for the target role: "${targetRole}".`
      : "Evaluate this resume generally for software engineering / industry ATS friendliness."
  }

Analyze the resume text thoroughly and respond with ONLY a raw JSON object (no markdown formatting, no code block backticks) matching this EXACT structure:
{
  "score": 75,
  "strengths": ["Clear section headings", "Quantifiable metrics in bullet points"],
  "issues": ["Lack of action verbs in experience section", "Unclear summary section"],
  "missingKeywords": ["Docker", "Kubernetes", "CI/CD"],
  "rewrites": [
    {
      "original": "Worked on backend APIs",
      "suggestion": "Engineered scalable RESTful microservices processing 10k daily requests"
    }
  ]
}

RESUME TEXT:
${resumeText}
`.trim();

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "";
    // Clean code blocks if present
    const cleanedJsonText = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const result = JSON.parse(cleanedJsonText);

    return {
      score: typeof result.score === "number" ? Math.min(100, Math.max(0, result.score)) : 70,
      strengths: Array.isArray(result.strengths) ? result.strengths : [],
      issues: Array.isArray(result.issues) ? result.issues : [],
      missingKeywords: Array.isArray(result.missingKeywords) ? result.missingKeywords : [],
      rewrites: Array.isArray(result.rewrites) ? result.rewrites : [],
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.error("Gemini API Error:", error);
    throw ApiError.internal("AI analysis service encountered an error. Please check your API key or retry.");
  }
}