import express from "express";
import { PORT } from "./configs/serverConfig.js";
import { connectDB } from "./configs/dbConfig.js";
import bot from "./configs/botConfig.js";
import startHandler from "./startHandler.js";
import uploadAction from "./handlers/actionHandlers/uploadAction.js";


const app = express();

bot.start((ctx) => {
    console.log("context in start command", ctx);
    return startHandler(ctx)
});
bot.action('UPLOAD', (ctx) => {
    console.log("context in upload command", ctx);
    return uploadAction(ctx)
})
bot.action('BROWSE', (ctx) => {
    console.log("context in browse command", ctx);
    return downloadAction(ctx)
})

app.listen(PORT, async () => {
    try {
        
        await connectDB();
        console.log('Server is up on ', PORT, "port")
        bot.launch()

    } catch (error) {
        console.log(error.message)
    }
})