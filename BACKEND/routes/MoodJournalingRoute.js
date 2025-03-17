import express from "express";
import MoodJournaling from "../models/Mood_journaling.js";

const router = express.Router();

// Route to insert data into the database
router.post("/mood-journal-insert", async (req, res) => {
    try {
        // Destructure the data from the request body
        const {
            user_id,
            Overall_mood,
            mood_intensity,
            emotion,
            mood_trigger,
            cope_mood,
            notes,
            reflection,
            image
        } = req.body;

        // Ensure image is an array
        const imageArray = Array.isArray(image) ? image : [image];

        // Create a new MoodJournaling document
        const newEntry = new MoodJournaling({
            user_id : "1",
            Overall_mood : Overall_mood,
            mood_intensity : mood_intensity,
            emotion : emotion,
            mood_trigger : mood_trigger,
            cope_mood: cope_mood,
            notes : notes,
            reflection : reflection,
            image: image
        });

        // Save the document to the database
        const savedEntry = await newEntry.save();

        // Return a success response
        res.status(201).json({ 
            message: "Mood journal entry added successfully.", 
            data: savedEntry 
        });
    } catch (error) {
        console.error("Error inserting mood journal entry:", error);
        res.status(500).json({ 
            message: "Internal server error.", 
            error: error.message 
        });
    }
});

export default router;
