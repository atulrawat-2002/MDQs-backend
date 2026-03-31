import mongoose, { model, Schema } from "mongoose";

const paperSchema = new Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "course"
  },
  semesterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "semester"
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "subject"
  },
  files: [
    {
      publicId: { type: String, required: true },
      url: { type: String, required: true },
      fileType: { type: String, enum: ["pdf", "image", "document"], required: true }
    }
  ]
}, { timestamps: true });

paperSchema.index({ courseId: 1, semesterId: 1, subjectId: 1 }, { unique: true });

const Paper = model("paper", paperSchema);
export default Paper;