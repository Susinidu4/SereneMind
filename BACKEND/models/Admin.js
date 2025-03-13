import mongoose from "mongoose";


const AdminSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String},
    email: { type: String},
    password: { type: String},
    role: { type: String, default: 'admin' },
});

AdminSchema.pre('save', function(next) {
    if (!this._id) {
        this._id = generateCustomId();  // Replace with your custom ID generation logic
    }
    next();
});

function generateCustomId() {
    // Custom ID generation logic, e.g., a combination of timestamp and a random number
    return 'AID-' + Math.floor(Math.random() * 10000);
}

export default mongoose.model('Admin', AdminSchema);