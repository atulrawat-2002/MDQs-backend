import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./serverConfig.js";
import { courseHandler } from "../handlers/actionHandlers/courseHandler.js";

const bot = new Telegraf(BOT_TOKEN);

export default bot;