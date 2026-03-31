import mongoose, { model, Schema } from "mongoose";

const semesterSchema = new Schema({
  number: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "course"
  }
}, { timestamps: true });

semesterSchema.index({ number: 1, courseId: 1 }, { unique: true });

const Semester = model("semester", semesterSchema);
export default Semester;