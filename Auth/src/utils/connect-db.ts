import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to db");
  } catch (error) {
    console.log("Error while connecting to db \n", error);
  }
};
