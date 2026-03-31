import { Markup } from "telegraf";
import mongoose from "mongoose";
import Course from "../../schemas/courseSchema.js";
import Semester from "../../schemas/semesterSchema.js";
import Subject from "../../schemas/subjectSchema.js";

export function courseHandler(bot) {

  // STEP 1 — User picks a course → show semesters
  bot.action(/^upload_course:(.+)$/, async (ctx) => {
    const courseId = ctx.match[1];
    await ctx.answerCbQuery();

    ctx.session = ctx.session || {};
    ctx.session.courseId = courseId;

    try {
      const course = await Course.findById(courseId);
      ctx.session.courseName = course.name;

      const semesters = await Semester.find({
        courseId: new mongoose.Types.ObjectId(courseId)
      }).sort({ number: 1 });

      if (!semesters.length) {
        return ctx.reply("No semesters found for this course.");
      }

      const buttons = semesters.map(sem =>
        Markup.button.callback(`Semester ${sem.number}`, `upload_sem:${sem._id}`)
      );

      await ctx.reply("📅 Choose a semester:", Markup.inlineKeyboard(buttons, { columns: 2 }));

    } catch (err) {
      console.error(err);
      await ctx.reply("Error fetching semesters.");
    }
  });

  // STEP 2 — User picks a semester → show subjects
  bot.action(/^upload_sem:(.+)$/, async (ctx) => {
    const semesterId = ctx.match[1];
    await ctx.answerCbQuery();

    ctx.session = ctx.session || {};
    ctx.session.semesterId = semesterId;

    try {
      const semester = await Semester.findById(semesterId);
      ctx.session.semNumber = semester.number;

      // ✅ Direct query using semesterId — clean with new schema
      const subjects = await Subject.find({
        courseId: new mongoose.Types.ObjectId(ctx.session.courseId),
        semesterId: new mongoose.Types.ObjectId(semesterId)
      });

      if (!subjects.length) {
        return ctx.reply("No subjects found for this semester.");
      }

      const buttons = subjects.map(s =>
        Markup.button.callback(s.name, `upload_subject:${s._id}`)
      );

      await ctx.reply("📖 Choose a subject:", Markup.inlineKeyboard(buttons, { columns: 1 }));

    } catch (err) {
      console.error(err);
      await ctx.reply("Error fetching subjects.");
    }
  });
}