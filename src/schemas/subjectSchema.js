import mongoose, { model, Schema } from "mongoose";

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "course"
  },
  semesterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "semester"
  }
}, { timestamps: true });

subjectSchema.index({ name: 1, courseId: 1, semesterId: 1 }, { unique: true });

const Subject = model("subject", subjectSchema);
export default Subject;