import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, require: true, unique: true },
  password: { type: String, required: true }, 
  
  //for initial account verify
  verifyOtp: { type: String, default: '' },
  verifyOtpExpiryTime: { type: Number, default:0 },
  isAccountVerified: { type: Boolean, default: false },

  //for reseting  password 
  resetPasswordOtp: { type: String, default:'' },
  resetOtpExpiryTime: { type:Number, default:0 },  

})

const userModel = mongoose.models.user || mongoose.model('user', userSchema); 

export default userModel; 