import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, required: true },

  //for initial account verify
  verifyOtp: { type: String, default: '' },
  verifyOtpExpiryTime: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },

  //for reseting  password 
  resetPasswordOtp: { type: String, default: '' },
  resetOtpExpiryTime: { type: Number, default: 0 },

  // Profile Info with Defaults
  phone: { type: String, default: '' },
  bio: { type: String, default: 'No bio added yet.' },
  dob: { type: Date, default: null }, // let it be null until user sets a valid date

  // Location with Defaults
  country: { type: String, default: 'Not specified' },
  state: { type: String, default: 'Not specified' },
  city: { type: String, default: 'Not specified' },
  pincode: { type: String, default: '' },


})


const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel; 