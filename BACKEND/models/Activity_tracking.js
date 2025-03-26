import mongoose from "mongoose";

const daySchema = new mongoose.Schema(
  {
      progress: { type: Number, required: true },
      note: { type: String, required: true },
      plane_id : {type: String, required:true}
  },{_id:false}
);

const ActivityTrackingSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    Day: [daySchema],
  },
  {
    collection: "Activity_tracking",
    timestamps: true,
  }
);


export default mongoose.model('Activity_Tracking', ActivityTrackingSchema);
