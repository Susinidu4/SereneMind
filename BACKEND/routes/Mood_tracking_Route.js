import express from 'express';
import Mood from '../models/Mood_tracking.js';


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


//analyze mood data
router.get('/analyze', async (req, res) => {

    // Map emoji to emotion
  const emotionMap = {
    "😊": "happy",
    "😔": "sad",
    "😡": "angry",
    "😴": "tired",
    "😢": "feeling down",
    "😂": "feeling joyfull",
    "😰": "feeling anxious",
    "🤢": "feeling sick",
    "🥳": "feeling excited",
    "😕": "feeling confused"
  };
  const emotion = emotionMap[emoji] || "neutral";

});



export default router;