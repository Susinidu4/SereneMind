import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
});

// Pre-save hook to generate a custom ID if _id is not provided
AdminSchema.pre('save', function(next) {
    if (!this._id) {
        this._id = generateCustomId();  // Replace with your custom ID generation logic
    }
    next();
});

// Function to generate a custom ID
function generateCustomId() {
    // Custom ID generation logic, e.g., a combination of timestamp and a random number
    return 'AID-' + Math.floor(Math.random() * 10000);
}

// Export the Admin model
export default mongoose.model('Admin', AdminSchema);