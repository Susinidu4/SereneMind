import express from "express";
import mentalHealthSuggestions from "../Data/suggesions_data.js";
import Suggesion from "../models/Suggesion.js";

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


// Create a new suggestions bundle
router.post('/add', async (req, res) => {
  try {
    const { user_id, suggestions } = req.body;

    // Validate input
    if (!user_id || !suggestions || !Array.isArray(suggestions)) {
      return res.status(400).json({
        success: false,
        message: 'user_id and suggestions array are required'
      });
    }

    // Validate each suggestion
    for (const suggestion of suggestions) {
      if (!suggestion.id || !suggestion.title) {
        return res.status(400).json({
          success: false,
          message: 'Each suggestion must have an id and title'
        });
      }
    }

    // Create new bundle
    const newBundle = new Suggesion({
      user_id,
      suggestions
    });

    // Save to database
    const savedBundle = await newBundle.save();

    res.status(201).json({
      success: true,
      message: 'Suggestions bundle created successfully',
      data: savedBundle
    });

  } catch (error) {
    console.error('Error creating suggestions bundle:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});


//get suggestions by user
router.get('/user/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const { limit, sort } = req.query;

    // Validate user_id
    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: 'user_id is required'
      });
    }

    // Build query options
    const options = {
      sort: { date: -1 } // Default: newest first
    };

    if (limit) {
      options.limit = parseInt(limit);
    }

    if (sort) {
      options.sort = { date: sort === 'asc' ? 1 : -1 };
    }

    // Execute query
    const userSuggestions = await Suggesion.find({ user_id }, null, options).lean();

    // Calculate days until expiration for each bundle
    const now = new Date();
    const enhancedSuggestions = userSuggestions.map(bundle => ({
      ...bundle,
      expires_in_days: Math.ceil((bundle.expires - now) / (1000 * 60 * 60 * 24)),
      is_expired: bundle.expires < now
    }));

    res.status(200).json({
      success: true,
      count: enhancedSuggestions.length,
      data: enhancedSuggestions
    });

  } catch (error) {
    console.error('Error fetching user suggestions:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

//get all the obejects
router.get('/all/suggestions', async (req, res) => {
  try {
    const allSuggestions = await Suggesion.find().lean();
    res.status(200).json({
      success: true,
      count: allSuggestions.length,
      data: allSuggestions
    });
  } catch (error) {
    console.error('Error fetching all suggestions:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

//delete sugeesion by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSuggestion = await Suggesion.findByIdAndDelete(id);
    if (!deletedSuggestion) {
      return res.status(404).json({
        success: false,
        message: 'Suggestion not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Suggestion deleted successfully',
      data: deletedSuggestion
    });
  } catch (error) {
    console.error('Error deleting suggestion:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});
export default router;