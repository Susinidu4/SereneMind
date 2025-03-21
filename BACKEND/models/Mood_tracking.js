import mongoose from "mongoose";

const Mood_Log_Schema = new mongoose.Schema({
  
  _id:{type:String},
  emoji: { type: String, required: true },
  user_id: { type: String, required: true },
},
{ timestamps: true });


// Pre-save hook to generate a custom ID if _id is not provided
Mood_Log_Schema.pre('save', function(next) {
  if (!this._id) {
      this._id = generateCustomId();  // Replace with your custom ID generation logic
  }
  next();
});

// Function to generate a custom ID
function generateCustomId() {
  // Custom ID generation logic, e.g., a combination of timestamp and a random number
  return 'MID-' + Math.floor(Math.random() * 10000);
}

export default mongoose.model("Mood_tracking", Mood_Log_Schema);