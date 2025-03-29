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

// Get data by user_id and plane_id
router.get('/users/:user_id/planes/:plane_id', async (req, res) => {
  try {
    const { user_id, plane_id } = req.params;

    // Find all documents for the user that contain days with the specified plane_id
    const activities = await ActivityTracking.aggregate([
      {
        $match: {
          user_id: user_id,
          "Day.plane_id": plane_id
        }
      },
      {
        $unwind: "$Day" // Split each day into separate documents
      },
      {
        $match: {
          "Day.plane_id": plane_id // Filter to only keep matching plane_id entries
        }
      },
      {
        $group: {
          _id: "$_id", // Group back by original document ID
          user_id: { $first: "$user_id" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          Days: { 
            $push: "$Day" // Rebuild array with only matching days
          }
        }
      }
    ]);

    if (!activities || activities.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No activities found for this user and plane combination"
      });
    }

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });

  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
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


//delete data using user id and plane id
router.delete('/users/:user_id/planes/:plane_id', async (req, res) => {
  try {
    const { user_id, plane_id } = req.params;

    // Validate parameters
    if (!user_id || !plane_id) {
      return res.status(400).json({ 
        message: 'Both user_id and plane_id are required' 
      });
    }

    // Find the document that contains both the user_id and plane_id
    const document = await ActivityTracking.findOne({
      user_id,
      'Day.plane_id': plane_id
    });

    if (!document) {
      return res.status(404).json({ 
        message: 'No matching document found with the specified user_id and plane_id' 
      });
    }

    // Delete the entire document
    const result = await ActivityTracking.deleteOne({ _id: document._id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        message: 'Document could not be deleted' 
      });
    }

    res.status(200).json({ 
      message: 'Document deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ message: 'Internal server error' });
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


//update data by user id and plane id
router.put('/users/:user_id/planes/:plane_id', async (req, res) => {
  try {
    const { user_id, plane_id } = req.params;
    const { progress, note } = req.body;

    // Validate all required fields for replacement
    if (progress === undefined || note === undefined) {
      return res.status(400).json({ 
        message: 'Both progress and note are required for full replacement' 
      });
    }

    const result = await ActivityTracking.updateOne(
      { 
        user_id,
        'Day.plane_id': plane_id 
      },
      { 
        $set: { 
          'Day.$.progress': progress,
          'Day.$.note': note
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        message: 'User or day entry not found' 
      });
    }

    res.status(200).json({ 
      message: 'Day entry fully replaced',
      updated: result.modifiedCount > 0
    });
  } catch (error) {
    console.error('Error replacing day entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Route for Daily Notes (Table Data)
router.get("/progress/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Fetch the activity tracking for the specific user
    const activityTracking = await ActivityTracking.findOne({ user_id: id });
    
    if (!activityTracking) {
      return res.status(404).json({ message: "No activities found for this user" });
    }

    // Extract daily notes
    const dailyNotes = activityTracking.Day.map((day) => ({
      time: day.time,
      date: day.date,
      activity: day.activity,
      note: day.note,
    }));

    // Send response with daily notes
    res.status(200).json({ notes: dailyNotes });
  } catch (error) {
    console.error("Error fetching daily notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Route for Overall Progress (Pie Chart Data)
router.get("/progress/overall/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Fetch the activity tracking for the specific user
    const activityTracking = await ActivityTracking.findOne({ user_id: id });
    
    if (!activityTracking) {
      return res.status(404).json({ message: "No activities found for this user" });
    }

    // Calculate total progress
    const totalProgress = (activityTracking.Day.reduce((sum, day) => sum + day.progress, 0) / activityTracking.Day.length).toFixed(2);

    // Send response with the overall progress data
    res.status(200).json({ totalPercentage: totalProgress });
  } catch (error) {
    console.error("Error fetching overall progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Route for Daily Progress (Bar Chart Data)
router.get("/progress/daily/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Fetch the activity tracking for the specific user
    const activityTracking = await ActivityTracking.findOne({ user_id: id });
    
    if (!activityTracking) {
      return res.status(404).json({ message: "No activities found for this user" });
    }

    // Map the daily progress data to include only activity and progress
    const progressData = activityTracking.Day.map((day) => ({
      activity: day.activity,  // The activity (could be a title or type)
      progress: day.progress,  // The progress percentage for that activity
    }));

    // Send response with the simplified daily progress data
    res.status(200).json({ days: progressData });
  } catch (error) {
    console.error("Error fetching daily progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



export default router;


