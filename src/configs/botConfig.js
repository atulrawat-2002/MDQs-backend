import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./serverConfig.js";
import { configDotenv } from "dotenv";

configDotenv();


const bot = new Telegraf(BOT_TOKEN);

export default bot;