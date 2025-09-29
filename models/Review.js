import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 80 },
  company: { type: String, maxlength: 120 },
  email: { type: String, maxlength: 160 },  
  rating: { type: Number, min: 1, max: 5, required: true },
  message: { type: String, required: true, minlength: 10, maxlength: 1000 },
  status: { type: String, enum: ["pending","approved","rejected"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Review", ReviewSchema);
