import { model, Schema } from "mongoose";

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const Course = model("course", courseSchema);
export default Course;