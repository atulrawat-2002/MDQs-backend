import bot from "./configs/botConfig.js";
import startHandler from "./handlers/startHandler.js";

async function botCommandHandler() {
    console.log('bot command handler')
    bot.command('/start', (ctx) => startHandler(ctx));

}


export default botCommandHandler;