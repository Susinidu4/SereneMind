import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const moodJournalingSchema = new Schema(
    {
        user_id: {type: String, required: true},
        Overall_mood: { type: Number, required: true },
        journaling: { type: String, required: true },
        mood_intensity: { type: Number, required: true },
        emotion : { type: String, required: true },
        mood_trigger: { type: String, required: true },
        cope_mood: { type: String, required: true },
        notes: { type: String, required: true },
        reflection: { type: String, required: true },
        image: { type: [String], required: true },
    },
    {
        collection: "Mood_journaling",
        timestamps: true,
    }
);

const MoodJournaling = model( "MoodJournaling",moodJournalingSchema);

export default MoodJournaling;