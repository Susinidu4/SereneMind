import express from "express";
import mentalHealthSuggestions from "../Data/suggesions_data.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(mentalHealthSuggestions);
});

export default router;