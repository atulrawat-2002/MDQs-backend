import mongoose from "mongoose";
import { DB_URI } from "./serverConfig.js";

export async function connectDB() {
    try {
        
        await mongoose.connect(DB_URI);
        console.log('Connected to database')

    } catch (error) {
        console.log('Error connecting to databse', error.message);
    }
}