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
    const activity = await ActivityTracking.find({ user_id });

    if (!activity) {
      return res.status(404).json({ message: "No activities found for this user" });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error("Error fetching user activities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//delete data by id (use main _id)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid activity tracking ID format'
      });
    }

    // Find and delete the document
    const deletedActivity = await ActivityTracking.findByIdAndDelete(id);

    if (!deletedActivity) {
      return res.status(404).json({
        success: false,
        message: 'Activity tracking document not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Activity tracking record deleted successfully',
      data: {
        deletedId: deletedActivity._id,
        user_id: deletedActivity.user_id,
        daysCount: deletedActivity.Day.length
      }
    });

  } catch (error) {
    console.error('Error deleting activity tracking:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

//update data by id (use main _id)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
 
    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid activity tracking ID format'
      });
    }

    // Find and update the document
    const updatedActivity = await ActivityTracking.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({
        success: false,
        message: 'Activity tracking document not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Activity tracking record updated successfully',
      data: {
        updatedId: updatedActivity._id,
        user_id: updatedActivity.user_id,
        daysCount: updatedActivity.Day.length
      }
    });

  } catch (error) {
    console.error('Error updating activity tracking:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
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


