import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const FeedbackSchema = new Schema(
    {
        user_id: {type: String, required: true},
        resourse_id: {type: String, required: true},
        ratings: { type: Number, required: true },
    },
    {
        collection: "Feedback",
        timestamps: true,
    }
    );

const Feedback = model( "Feedback",FeedbackSchema);

export default Feedback;