import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  totalUsers: { type: Number, default: 0 },
  totalVisits: { type: Number, default: 0 },
  totalConversions: { type: Number, default: 0 } 
})

const Stats = mongoose.models.Stats ||  mongoose.model('Stats', statsSchema);

export default Stats; 