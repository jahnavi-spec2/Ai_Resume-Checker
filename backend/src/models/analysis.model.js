import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    resume: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "Resume", 
         required: true, 
         index: true
         },
    version: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
         index: true
         },
    targetRole: { 
        type: String,
         trim: true 
        },
    score: {
         type: Number, 
         required: true,
          min: 0, 
          max: 100 
        },
    strengths: [{ type: String }],
    issues: [{ type: String }],
    missingKeywords: [{ type: String }],
    rewrites: [
      {
        original: String,
        suggestion: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Analysis", analysisSchema);