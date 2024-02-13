import mongoose from "mongoose";

const connectToDb = async () => {
  let isConnected = false;
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Already Connected");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    isConnected = true;
    // console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
export default connectToDb;
