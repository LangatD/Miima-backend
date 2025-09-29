import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
  name: { type:String, required:true },
  company: String,
  city: String,
  street: String,
  zip: String,
  state: String,
  phone: String,
  email: { type:String, required:true },
  service: String,
  serviceOther: String,
  location: String,
  desiredStartDate: String,
  description: String,
  reference: { type:String, index:true }, 
}, { timestamps:true });

export default mongoose.model('Quote', QuoteSchema);
