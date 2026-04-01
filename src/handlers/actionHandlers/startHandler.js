import { Markup } from "telegraf";

async function startHandler(ctx) {
  ctx.session = null; // reset any previous flow

  // await ctx.replyWithPhoto('https://res.cloudinary.com/djw0f2dty/image/upload/v1774963273/Vidya_upcivo.jpg');

  return ctx.reply(
    'Welcome to MDQs Bot!\nWhat would you like to do?',
    Markup.inlineKeyboard([
      [Markup.button.callback('Upload Paper', 'UPLOAD')],
      [Markup.button.callback('Download Papers', 'BROWSE')]
    ])
  );
}

export default startHandler;