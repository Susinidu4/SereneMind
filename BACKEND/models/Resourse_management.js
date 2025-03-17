import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const ResourseManagementSchema = new Schema(
  {
    user_id: {type: String, required: true},
    admin_id: {type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: [String], required: true },
    reference: { type: String, required: true },
    auther_name: { type: String, required: true },
    auther_designation: { type: String, required: true },
  },
  {
    collection: "Resourse_management",
    timestamps: true,
  }
);

const ResourseManagement = model( "ResourseManagement",ResourseManagementSchema);

export default ResourseManagement;
