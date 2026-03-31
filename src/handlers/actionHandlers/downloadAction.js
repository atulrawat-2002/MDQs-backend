import { Markup } from "telegraf";
import Course from "../../schemas/courseSchema.js";

export default async function downloadAction(ctx) {
  try {
    ctx.session = null; // reset session on fresh start

    const courses = await Course.find();
    if (!courses.length) return ctx.reply("No courses available.");

    const buttons = courses.map(c =>
      Markup.button.callback(c.name, `browse_course:${c._id}`)
    );

    await ctx.reply("📚 Choose a course to browse:", Markup.inlineKeyboard(buttons, { columns: 1 }));

  } catch (err) {
    console.error(err);
    return ctx.reply("Error fetching courses.");
  }
}