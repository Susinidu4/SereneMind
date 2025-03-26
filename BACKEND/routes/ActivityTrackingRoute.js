import express from "express";
import ActivityTracking from "../models/Activity_tracking.js";
import mongoose from "mongoose"; 

const router = express.Router();



// Create a new activity tracking entry with user_id from params
router.post("/addlog/:user_id", async (req, res) => {
    try {
      const { user_id } = req.params;
      const { Day } = req.body;
  
      // Validate input
      if (!Day || !Array.isArray(Day)) {
        return res.status(400).json({ message: "Day array is required" });
      }
  
      // Validate each day entry
      for (const day of Day) {
        if (!day.progress || !day.note) {
          return res.status(400).json({ 
            message: "Each day entry must contain progress, note, and dtm" 
          });
        }
      }
  
      // Create new activity tracking
      const newActivityTracking = new ActivityTracking({
        user_id,
        Day
      });
  
      // Save to database
      const savedActivityTracking = await newActivityTracking.save();
  
      res.status(201).json(savedActivityTracking);
    } catch (error) {
      console.error("Error creating activity tracking:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })

  // Get all activity tracking entries
router.get("/", async (req, res) => {
  try {
    const activityTrackings = await ActivityTracking.find();
    res.status(200).json(activityTrackings);
  } catch (error) {
    console.error("Error fetching activity trackings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Get all activities for a user
router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const activity = await ActivityTracking.findOne({ user_id });

    if (!activity) {
      return res.status(404).json({ message: "No activities found for this user" });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error("Error fetching user activities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Update a specific day's progress


 


// Delete an specific day's progress



export default router;
