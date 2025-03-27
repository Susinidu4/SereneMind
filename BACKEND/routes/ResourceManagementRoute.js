import express from "express";
import ResourseManagement from "../models/Resourse_management.js";
import Feedback from "../models/Feedback.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // where to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // unique file name
    },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB file size limit
    }
});

// POST route for submitting form data with SINGLE image upload
router.post("/addResource", upload.single('image'), async (req, res) => {
  try {
      const {
          admin_id,
          title,
          description,
          content,
          reference,
          auther_name,
          auther_designation,
      } = req.body;

      // Check for missing fields
      if (!admin_id || !title || !description || !content || !auther_name || !auther_designation) {
          // If there's an uploaded file but validation failed, remove it
          if (req.file) {
              fs.unlinkSync(req.file.path);
          }
          return res.status(400).json({ error: "All fields are required." });
      }

      // Create a new resource document with image path if available
      const newResource = new ResourseManagement({
          admin_id,
          title,
          description,
          content,
          reference,
          auther_name,
          auther_designation,
          image: req.file ? req.file.filename : null // Save the filename if image was uploaded
      });

      // Save to the database
      await newResource.save();

      res.status(201).json({ 
          message: "Resource added successfully!",
          imagePath: req.file ? req.file.filename : null
      });
  } catch (error) {
      console.error("Error adding resource:", error.message, error);
      
      // If there was an error and a file was uploaded, remove it
      if (req.file) {
          fs.unlinkSync(req.file.path);
      }
      
      res.status(500).json({ 
          error: error.message || "Failed to add resource." 
      });
  }
});


// GET all resources
router.get("/getAllResources", async (req, res) => {
  try {
    const resources = await ResourseManagement.find();
    res.status(200).json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Failed to retrieve resources." });
  }
});


// GET a single resource by ID
router.get("/getResource/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the resource by ID
    const resource = await ResourseManagement.findById(id);

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    // Return the resource data
    res.status(200).json(resource);
  } catch (error) {
    console.error("Error fetching resource:", error);
    res.status(500).json({ error: "Failed to fetch resource details" });
  }
});


// DELETE: Remove a resource by ID
router.delete("/deleteResource/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if resource exists
    const resource = await ResourseManagement.findById(id);
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    // Delete the resource
    await ResourseManagement.findByIdAndDelete(id);
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    console.error("Error deleting resource:", error);
    res.status(500).json({ error: "Failed to delete resource" });
  }
});


// Route to insert feedback data
router.post("/add-feedback", async (req, res) => {
    try {
        // Destructure data from the request body
        const { user_id, resourse_id, ratings } = req.body;

        // Validate that all fields are present
        if (!user_id || !resourse_id || !ratings) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new Feedback document
        const newFeedback = new Feedback({
          user_id,
          resourse_id, // received from frontend
          ratings,
        });

        // Save the feedback document to the database
        const savedFeedback = await newFeedback.save();

        // Respond with success
        res.status(201).json({
            message: "Feedback added successfully",
            feedback: savedFeedback,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



// Get percentage of ratings for each resource
router.get("/ratings/:resource_id", async (req, res) => {
    try {
        const { resource_id } = req.params;
        
        // Fetch ratings for the resource
        const feedbacks = await Feedback.find({ resourse_id: resource_id });
        
        if (feedbacks.length === 0) {
            return res.json({ averageRating: 0, percentage: 0 });
        }
        
        // Calculate average rating
        const totalRatings = feedbacks.reduce((sum, feedback) => sum + feedback.ratings, 0);
        const averageRating = totalRatings / feedbacks.length;
        
        // Convert to percentage (assuming max rating is 5)
        const percentage = (averageRating / 5) * 100;
        
        res.json({ averageRating, percentage });
    } catch (error) {
        console.error("Error fetching ratings:", error);
        res.status(500).json({ message: "Server error" });
    }
});



export default router;
