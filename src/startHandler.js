import { Markup } from "telegraf";



function startHandler(ctx) {
  ctx.session = null; // reset any previous flow

  return ctx.reply(
    'Welcome! What would you like to do?',
    Markup.inlineKeyboard([
      [Markup.button.callback('Upload Paper', 'UPLOAD')],
      [Markup.button.callback('Browse Papers', 'BROWSE')]
    ])
  );
}

export default startHandler;