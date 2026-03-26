import { model, Schema } from "mongoose";

const paperSchema = new Schema({

    course: {
        type: String,
    },
    subject: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6],
        required: true
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