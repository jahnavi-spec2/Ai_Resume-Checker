import mongoose from "mongoose";

const jobMatchSchema=new mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resume:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      index: true,
    },
    verison:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    jobTitle:{
      type: String,
      trim: true,
      default: "Target Position",
    },
    jobDescription:{
      type: String,
      required: true,
    },
    matchscore:{
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    matchingSkills: [{

    }],
    missingSkills:  [{type:String}],
    missingKeywords:[{type:String}],
    experienceGaps: [{type:String}],
    experienceGaps: [{type:String}],
    suggestions:    [{type:String}]
},
{timestamps:true}
);

export default mongoose.model("JobMatch",jobMatchSchema)