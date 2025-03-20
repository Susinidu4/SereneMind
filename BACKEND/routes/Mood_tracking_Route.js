import express from 'express';
import Mood from '../models/Mood_tracking.js';
import mentalHealthSuggestions from '../Data/suggesions_data.js';
import axios from 'axios';


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newMood = new Mood(req.body);
        await newMood.save();
        res.status(200).json({ message: 'Mood added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const moods = await Mood.find();
        res.status(200).json(moods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const mood = await Mood.findById(req.params.id);
        res.status(200).json(mood);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// get all moods of a user
router.get('/user/:userId', async (req, res) => {
    try {
        const moods = await Mood.find({ user_id: req.params.userId });
        res.status(200).json(moods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

//update mood
router.put('/:id', async (req, res) => {
    try {
        await Mood.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: 'Mood updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


//delete mood
router.delete('/:id', async (req, res) => {
    try {
        await Mood.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Mood deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});



// Emoji to Emotion Mapping
const emotionMap = {
  "😊": "happy",
  "😔": "sad",
  "😡": "angry",
  "😴": "tired",
  "😢": "feeling down",
  "😂": "feeling joyful",
  "😰": "feeling anxious",
  "🤢": "feeling sick",
  "🥳": "feeling excited",
  "😕": "feeling confused"
};


// Analyze mood data
router.get('/analyze/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Fetch user's mood data from today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day

    // Fetch user-entered data from the database
    const userMoods = await Mood.find({
      user_id: userId,
      createdAt: { $gte: today } // Fetch records created today or later
    });

    // Get all the user-entered emojis into an array
    const userEmojis = userMoods.map(mood => mood.emoji);
    console.log("User Emojis:", userEmojis);

    if (userMoods.length === 0) {
      return res.status(404).json({ message: "No mood data found for today." });
    }

    // Fetch mental health suggestions (replace this with your actual dataset or API call)
    const suggesions = await axios.get("http://localhost:5000/suggestions");
    const mentalHealthSuggestions = suggesions.data;


    // Filter suggestions based on user-entered emojis
    const suggestions = mentalHealthSuggestions.filter(suggestion =>
      userEmojis.includes(suggestion.category)
    );

    // Extract only the required fields (title, plain, time duration per day)
    const response = suggestions.map(suggestion => ({
      id: suggestion.id,
      title: suggestion.title,
      plane: suggestion.plane,
      "time duration per day": suggestion["time duration per day"]
    }));

    res.json({ userEmojis, suggestions: response });
  } catch (error) {
    console.error("Error analyzing mood data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



export default router;