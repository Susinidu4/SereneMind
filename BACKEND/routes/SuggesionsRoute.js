import express from "express";
import mentalHealthSuggestions from "../Data/suggesions_data.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(mentalHealthSuggestions);
});


// Route to fetch data by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id); // Get the ID from the URL parameter
  const suggestion = mentalHealthSuggestions.find(item => item.id === id); // Find the suggestion by ID

  if (suggestion) {
      res.json(suggestion); // Return the suggestion if found
  } else {
      res.status(404).json({ message: 'Suggestion not found' }); // Return a 404 error if not found
  }
});
export default router;