import express from "express";
import { PORT } from "./configs/serverConfig.js";
import { connectDB } from "./configs/dbConfig.js";


const app = express();


app.listen(PORT, async () => {
    try {
        
        await connectDB();
        console.log('Server is up on ', PORT, "port")

    } catch (error) {
        console.log(error.message)
    }
})