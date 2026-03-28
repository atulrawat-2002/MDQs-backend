import mongoose, { model, Schema } from "mongoose";

const semesterSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Subject"
    }
})


const Semeser = model("subject", semesterSchema);


export default Semeser;