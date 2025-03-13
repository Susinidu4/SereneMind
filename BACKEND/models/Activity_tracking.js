const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActivityTrackingSchema = new Schema(
  {
    user_id: { type: String, required: true },
    Day: [daySchema],
  },
  {
    collection: "Activity_tracking",
    timestamps: true,
  }
);

const daySchema = new Schema(
    {
        progress: { type: Number, required: true },
        note: { type: String, required: true },
        dtm: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
);

const ActivityTracking = mongoose.model("ActivityTracking", ActivityTrackingSchema);

module.exports = ActivityTracking;
