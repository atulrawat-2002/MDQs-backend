import mongoose from "mongoose";
import { config } from "dotenv";

config(); // Load environment variables from .env file

export async function connectDB() {
    try {
        console.log(process.env.DB_URI);
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to database')

    } catch (error) {
        console.log('Error connecting to databse', error.message);
    }
}