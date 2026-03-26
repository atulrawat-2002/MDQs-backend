import bot from "../configs/botConfig.js";
import { Telegraf } from "telegraf";


async function startHandler(ctx) {

return ctx.reply('Bot is running');

}

export default startHandler;