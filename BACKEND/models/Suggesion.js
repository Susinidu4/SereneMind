import mongoose from "mongoose";

// Suggestion subdocument schema
const suggestionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  plane:{
    type:String
  }
}, { _id: false });

// Main document schema
const suggestionsBundleSchema = new mongoose.Schema({
  user_id:{type: String},
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  expires: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    index: { expires: 0 } // TTL index
  },
  suggestions: {
    type: [suggestionSchema],
    required: true
  }
});

// TTL index for automatic cleanup after expiration
suggestionsBundleSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });
export default mongoose.model('Suggesions', suggestionsBundleSchema);