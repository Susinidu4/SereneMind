import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const FeedbackSchema = new Schema(
    {
        user_id: {type: String, required: false},
        resourse_id: {type: String, required: false},
        ratings: { type: Number, required: false },
    },
    {
        collection: "Feedback",
        timestamps: true,
    }
    );

const Feedback = model( "Feedback",FeedbackSchema);

export default Feedback;