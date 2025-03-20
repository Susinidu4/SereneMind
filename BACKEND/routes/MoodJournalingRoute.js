import express from "express";
import MoodJournaling from "../models/Mood_journaling.js";
import mongoose from "mongoose"; 

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


// Route to retrieve mood journaling entries by user ID
router.get("/mood-journal/:user_id", async (req, res) => {
    try {
        // Extract user_id from the request parameters
        const { user_id } = req.params;

        // Fetch all mood journaling entries for the given user_id
        // const userEntries = await MoodJournaling.find({ user_id });
        const userEntries = await MoodJournaling.find({ user_id }).sort({ createdAt: -1 });
        // Check if entries exist
        if (!userEntries.length) {
            return res.status(404).json({ 
                message: "No mood journaling entries found for this user." 
            });
        }

        // Return the entries
        res.status(200).json({ 
            message: "Mood journaling entries retrieved successfully.", 
            data: userEntries 
        });
    } catch (error) {
        console.error("Error retrieving mood journaling entries:", error);
        res.status(500).json({ 
            message: "Internal server error.", 
            error: error.message 
        });
    }
});



router.delete("/remove/mood-journal/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Find and delete the MoodJournal entry by its ID
    const result = await MoodJournaling.findByIdAndDelete(id);

    // If the result is null, it means no document was found
    if (result) {
      return res.status(200).json({ message: "Record deleted successfully" });
    } else {
      return res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    // Log the detailed error message for debugging
    console.error("Error deleting record:", error);

    // Send a more detailed error message to the client (only for debugging, in production you may want to avoid revealing too much)
    return res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message || error 
    });
  }
});

  
export default router;
