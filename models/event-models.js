import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  name: { required: true, type: String },
  details: { required: true, type: String },
  location: { required: true, type: String },
  imageUrl: { required: true, type: String },
  date: { required: true, type: Date },
  time: { required: true, type: String },
  ticketPrice: { type: Number, default: 0 },
  capacity: { type: Number, default: null },
  category: {
    type: String,
    enum: ["Technology", "Business", "Music", "Sports", "Arts", "Education", "Other"],
    default: "Other",
  },
  website: { type: String, default: "" },
  organizer: { type: String, default: "" },
  interested_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  going_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  swags: { required: false, type: Array },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  rejectionReason: { type: String, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
}, { timestamps: true });

delete mongoose.models.events;
export const eventModel = mongoose.model("events", schema);