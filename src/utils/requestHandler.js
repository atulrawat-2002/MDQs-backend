import { Markup } from "telegraf";
import { configDotenv } from "dotenv";

// configDotenv();

const ADMIN_TELEGRAM = process.env.ADMIN_TELEGRAM; // your telegram username e.g. "@yourusername"

export function requestHandler(bot) {

  // ── REQUEST COURSE ────────────────────────────────────────────────────────
  bot.action("REQUEST_COURSE", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply(
      `📝 Course not found?\n\n` +
      `You can request to add:\n` +
      `👤 ${ADMIN_TELEGRAM}\n\n` +
      `We will try to add! 🙏`
    );
  });

  // ── REQUEST SUBJECT ───────────────────────────────────────────────────────
  bot.action("REQUEST_SUBJECT", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply(
      `📝 Subject not found?\n\n` +
      `You can request to add:\n` +
      `👤 ${ADMIN_TELEGRAM}\n\n` +
      `We will try to add! 🙏`
    );
  });

  // ── REQUEST FILE (no paper found) ─────────────────────────────────────────
  bot.action("REQUEST_File", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply(
      `📄 No files found for this subject yet.\n\n` +
      `You can request to add:\n` +
      `👤 ${ADMIN_TELEGRAM}\n\n` +
      `We will try to add! 🙏`
    );
  });

  // ── HANDLE RANDOM TEXT ────────────────────────────────────────────────────
  bot.on("text", async (ctx) => {

    // ignore /commands
    if (ctx.message.text.startsWith("/")) return;

    // ── Case 1: User is in upload flow → remind them
    if (ctx.session?.pendingUpload) {
      return ctx.reply(
        `⚠️ You are in an active upload session.\n\n` +
        `📎 Please send a file (PDF or Image)\n` +
        `🏁 Or send /done to finish uploading.`
      );
    }

    // ── Case 2: Random text with no active flow → guide them
    return ctx.reply(
      `I am not your boyfriend or girlfriend. 😊\n\n` +
      `But here is what I can do:`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Upload Paper", "UPLOAD")],
        [Markup.button.callback("Browse Papers", "BROWSE")]
      ])
    );
  });
}