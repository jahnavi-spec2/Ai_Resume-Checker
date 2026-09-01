import mongoose from "mongoose";

const versionSchema = new mongoose.Schema(
  {
    label: {
         type: String,
          required: true
         },
    sourceType: {
         type: String,
          enum: ["upload", "rewrite"],
           default: "upload" },
    rawText: { 
        type: String,
         required: true
         },
  },
  { timestamps: true }
);

const resumeSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
         required: true,
          index: true 
        },
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    versions: [versionSchema],
    currentVersionId: { 
        type: mongoose.Schema.Types.ObjectId },
  },
  
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);