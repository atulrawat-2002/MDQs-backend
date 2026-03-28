import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./serverConfig.js";

const bot = new Telegraf(BOT_TOKEN);

export default bot;