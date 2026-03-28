import mongoose, { model, Schema } from "mongoose";

const courseSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        }
    ]
})

const Course = model("course", courseSchema);

export default Course;