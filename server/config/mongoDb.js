import mongoose from "mongoose";
console.log("MONGODB_URI = ", JSON.stringify(process.env.MONGODB_URI));


const connectDb = async () => {
  mongoose.connection.on('connected', () => {
    console.log("Database Connected");
  })

  await mongoose.connect(`${process.env.MONGODB_URI}`); 
}

export default connectDb; 