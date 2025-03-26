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
router.put("/:user_id/day/:day_id", async (req, res) => {
  try {
    const { user_id, day_id } = req.params;
    const { progress, note, plane_id } = req.body;

    const activity = await ActivityTracking.findOne({ user_id });

    if (!activity) {
      return res.status(404).json({ message: "User not found" });
    }

    const dayToUpdate = activity.Day.id(day_id);
    if (!dayToUpdate) {
      return res.status(404).json({ message: "Day entry not found" });
    }

    // Update fields
    if (progress !== undefined) dayToUpdate.progress = progress;
    if (note !== undefined) dayToUpdate.note = note;
    if (plane_id !== undefined) dayToUpdate.plane_id = plane_id;

    await activity.save();
    res.status(200).json({ message: "Day progress updated successfully", activity });
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Delete an specific day's progress
router.delete("/:user_id/day/:day_id", async (req, res) => {
  try {
    const { user_id, day_id } = req.params;

    const activity = await ActivityTracking.findOne({ user_id });

    if (!activity) {
      return res.status(404).json({ message: "User not found" });
    }

    const dayToDelete = activity.Day.id(day_id);
    if (!dayToDelete) {
      return res.status(404).json({ message: "Day entry not found" });
    }

    // Remove the day entry
    activity.Day.id(day_id).remove();
    await activity.save();

    res.status(200).json({ message: "Day progress deleted successfully", activity });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Update a day entry by ActivityTracking _id and plane_id
router.put('/:activityId', async (req, res) => {
  try {
    const { activityId } = req.params;
    const { plane_id, progress, note } = req.body;

    // Validate required fields
    if (!plane_id) {
      return res.status(400).json({ 
        success: false,
        message: 'plane_id is required' 
      });
    }

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid activity tracking ID' 
      });
    }

    // Find the activity tracking document
    const activity = await ActivityTracking.findById(activityId);
    if (!activity) {
      return res.status(404).json({ 
        success: false,
        message: 'Activity tracking not found' 
      });
    }

    // Find and update the specific day entry
    const dayToUpdate = activity.Day.find(day => day.plane_id === plane_id);
    if (!dayToUpdate) {
      return res.status(404).json({ 
        success: false,
        message: 'Day entry not found with this plane_id' 
      });
    }

    // Update fields
    if (progress !== undefined) dayToUpdate.progress = progress;
    if (note !== undefined) dayToUpdate.note = note;

    // Save the updated document
    const updatedActivity = await activity.save();

    res.status(200).json({
      success: true,
      message: 'Day entry updated successfully',
      data: {
        activityId: updatedActivity._id,
        updatedDay: dayToUpdate
      }
    });

  } catch (error) {
    console.error('Error updating day entry:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});


// Delete a day entry by ActivityTracking _id and plane_id
router.delete('/:activityId', async (req, res) => {
  try {
    const { activityId } = req.params;
    const { plane_id } = req.body;

    // Validate required fields
    if (!plane_id) {
      return res.status(400).json({ 
        success: false,
        message: 'plane_id is required' 
      });
    }

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid activity tracking ID' 
      });
    }

    // Find and update the document
    const result = await ActivityTracking.findByIdAndUpdate(
      activityId,
      { $pull: { Day: { plane_id } } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ 
        success: false,
        message: 'Activity tracking not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Day entry deleted successfully',
      data: {
        activityId: result._id,
        plane_id,
        remainingDays: result.Day.length
      }
    });

  } catch (error) {
    console.error('Error deleting day entry:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

export default router;
