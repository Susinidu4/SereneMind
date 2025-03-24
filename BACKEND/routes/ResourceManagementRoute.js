import express from "express";
import ResourseManagement from "../models/Resourse_management.js";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

const router = express.Router();

// Setup multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/"); // where to save uploaded files
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname)); // file name
//     },
//   });

//   const upload = multer({ storage: storage });

// POST route for submitting form data (without image upload)
router.post("/addResource", async (req, res) => {
  try {
    const {
      admin_id,
      title,
      description,
      content,
      reference,
      auther_name,  // Fixed spelling
      auther_designation, // Fixed spelling
    } = req.body;

    // Check for missing fields
    if (!admin_id || !title || !description || !content || !auther_name || !auther_designation) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new resource document
    const newResource = new ResourseManagement({
      admin_id,
      title,
      description,
      content,
      reference,
      auther_name,
      auther_designation,
    });

    // Save to the database
    await newResource.save();

    res.status(201).json({ message: "Resource added successfully!" });
  } catch (error) {
    console.error("Error adding resource:", error.message, error);
    res.status(500).json({ error: error.message || "Failed to add resource." });
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

export default router;
