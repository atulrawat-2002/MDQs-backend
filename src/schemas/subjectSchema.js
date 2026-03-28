import mongoose, { model, Schema } from "mongoose";

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }  
})

const Subject = model('subject', subjectSchema);

export default Subject;