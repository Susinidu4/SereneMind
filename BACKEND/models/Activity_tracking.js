import mongoose from "mongoose";

const daySchema = new mongoose.Schema(
  {
      progress: { type: Number, required: true },
      note: { type: String, required: true },
      plane_id : {type: String, required:true},
      day: { type: String},
  },
);

const ActivityTrackingSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    Day: [daySchema],
    suggestion_id: { type: String },
  },
  {
    collection: "Activity_tracking",
    timestamps: true,
  }
);


export default mongoose.model('Activity_Tracking', ActivityTrackingSchema);
