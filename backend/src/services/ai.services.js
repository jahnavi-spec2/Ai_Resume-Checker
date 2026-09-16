import { GoogleGenAI } from "@google/genai";
import ApiError from "../utils/ApiError.js";

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw ApiError.internal("GEMINI_API_KEY is not configured in backend environment variables");
  }
  return new GoogleGenAI({ apiKey });
}

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

export async function analyzeResumeText(resumeText, targetRole = "") {
  const ai = getAiClient();

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
      model: DEFAULT_MODEL,
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

export const matchResumeWithJob = async (resumeText, jobTitle, jobDescription) => {
  const ai = getAiClient();

  const prompt = `You are an expert ATS (Applicant Tracking System) and Senior Technical Recruiter.
Compare the following candidate RESUME TEXT against the target JOB DESCRIPTION.

JOB TITLE:${jobTitle || "Not Specified"}
JOB DESCRIPTION:${jobDescription}

CANDIDATE RESUME TEXT:${resumeText}

Analyze how well the candidate matches this specific job description. Return ONLY a valid JSON object (no markdown, no backticks, no code blocks) with the following format:
{
  "matchScore": <number between 0 and 100 representing overall percentage fit>,
  "matchingSkills": [<array of key skills found in BOTH resume and job description>],
  "missingSkills": [<array of required or preferred skills mentioned in job description but missing in resume>],
  "missingKeywords": [<array of important domain keywords/phrases from job description missing in resume>],
  "experienceGaps": [<array of experience level, qualification, or domain gaps between resume and job description>],
  "suggestions": [<array of specific, actionable tips to tailor this resume for this job>]
}
`;

  try {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
    });

    const text = (response.text || "").trim();

    const jsonString = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const result = JSON.parse(jsonString);

    return {
      matchScore: Number(result.matchScore) || 0,
      matchingSkills: Array.isArray(result.matchingSkills) ? result.matchingSkills : [],
      missingSkills: Array.isArray(result.missingSkills) ? result.missingSkills : [],
      missingKeywords: Array.isArray(result.missingKeywords) ? result.missingKeywords : [],
      experienceGaps: Array.isArray(result.experienceGaps) ? result.experienceGaps : [],
      suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
    };
  } catch (error) {
    console.error("Gemini AI Job Matching Error:", error);
    throw new Error("Failed to process job matching analysis with AI");
  }
};

