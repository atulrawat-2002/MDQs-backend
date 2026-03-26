import express from "express";
import { PORT } from "./configs/serverConfig.js";
import { connectDB } from "./configs/dbConfig.js";
import botCommandHandler from "./botCommandHandler.js";
import { launchBot } from "./configs/botConfig.js";

const app = express();

botCommandHandler();

app.listen(PORT, async () => {
    try {
        
        await connectDB();
        launchBot()
        console.log('Server is up on ', PORT, "port")

    } catch (error) {
        console.log(error.message)
    }
})