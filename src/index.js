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

bot.use(session());

const app = express();

bot.start((ctx) => startHandler(ctx));

bot.action('UPLOAD', (ctx) => uploadAction(ctx));  // just shows the course keyboard

bot.action('BROWSE', (ctx) => downloadAction(ctx));

courseHandler(bot);

subjectHandler(bot);

browseHandler(bot);

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log('Server is up on ', PORT, "port");
        bot.launch();
    } catch (error) {
        console.log(error.message);
    }
});