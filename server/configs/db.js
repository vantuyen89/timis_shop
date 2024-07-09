import mongoose from "mongoose";


export const connectDB = async (DB_URI) => {
    try {
        await mongoose.connect(DB_URI)
        console.log("connected to mongoDB")
    } catch (error) {
        console.log("error connecting");
    }

}