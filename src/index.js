import express from "express";
import { PORT } from "./configs/serverConfig.js";
import { connectDB } from "./configs/dbConfig.js";
import bot from "./configs/botConfig.js";
import startHandler from "./handlers/actionHandlers/startHandler.js";
import uploadAction from "./handlers/actionHandlers/uploadAction.js";
import { courseHandler } from "./handlers/actionHandlers/courseHandler.js";
import { subjectHandler } from "./handlers/actionHandlers/subjectHandler.js";
import { session } from "telegraf";
import { browseHandler } from "./handlers/actionHandlers/browseHandler.js";
import downloadAction from "./handlers/actionHandlers/downloadAction.js";
import { configDotenv } from "dotenv";
import { requestHandler } from "./utils/requestHandler.js";
import cors from "cors";

configDotenv();

bot.use(session());

const app = express();

app.use(cors());

bot.start((ctx) => startHandler(ctx));

bot.action('UPLOAD', (ctx) => uploadAction(ctx));  // just shows the course keyboard

bot.action('BROWSE', (ctx) => downloadAction(ctx));

courseHandler(bot);

subjectHandler(bot);

browseHandler(bot);

requestHandler(bot);

async function pingSlack() {
    try {
        const response = await fetch('https://slack-clone-backend-82w6.onrender.com/ping');
        const data = await response.json();
        console.log("Response from slack", data)
    } catch (error) {
        console.log('Slack ping error ', error.message);
    }
}

setInterval(async () => {
    try {
        await pingSlack()
    } catch (error) {
        console.log("Error slack ping interval", error.message);
    }
}, 1000 * 60 * 10);

app.get('/ping', (req, res) => {
    res.status(200).json({
        message: "Bot is up"
    })
})

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log('Server is up on ', PORT, "port");
        bot.launch();
    } catch (error) {
        console.log(error.message);
    }
});