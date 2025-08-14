import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question"
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required :true
    },
    StudentId: {
        type :Schema.Types.ObjectId,
        ref: "User"
    }

},
    {
        timestamps: true
    }
)

export const Feedback = mongoose.model("Feedback", feedbackSchema)