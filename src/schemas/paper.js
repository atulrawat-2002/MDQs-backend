import mongoose, { model, Schema } from "mongoose";

const paperSchema = new Schema({

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Subject'
    },
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Semester',
    },
    files: [
        {
        publicId: String,
        url: String,
        fileType: String
    }
]

}, {
    timestamps: true
})


const Paper = new model('paper', paperSchema);

export default Paper;