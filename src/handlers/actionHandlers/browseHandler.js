import { Markup } from "telegraf";
import mongoose from "mongoose";
import Semester from "../../schemas/semesterSchema.js";
import Paper from "../../schemas/paperSchema.js";
import Subject from "../../schemas/subjectSchema.js";
import Course from "../../schemas/courseSchema.js";

export function browseHandler(bot) {

  // STEP 1 — User picks a course → show semesters
  bot.action(/^browse_course:(.+)$/, async (ctx) => {
    const courseId = ctx.match[1];
    await ctx.answerCbQuery();

    ctx.session = ctx.session || {};
    ctx.session.browseCourseId = courseId;

    try {
      const course = await Course.findById(courseId);
      ctx.session.browseCourseName = course.name;

      const semesters = await Semester.find({
        courseId: new mongoose.Types.ObjectId(courseId)
      }).sort({ number: 1 });

      if (!semesters.length) {
        return ctx.reply("No semesters found for this course.");
      }

      const buttons = semesters.map(sem =>
        Markup.button.callback(`Semester ${sem.number}`, `browse_sem:${sem._id}`)
      );

      await ctx.reply("Choose a semester:", Markup.inlineKeyboard(buttons, { columns: 2 }));

    } catch (err) {
      console.error(err);
      await ctx.reply("Error fetching semesters.");
    }
  });

  // STEP 2 — User picks a semester → show subjects
  bot.action(/^browse_sem:(.+)$/, async (ctx) => {
    const semesterId = ctx.match[1];
    await ctx.answerCbQuery();

    ctx.session = ctx.session || {};
    ctx.session.browseSemesterId = semesterId;

    try {
      const semester = await Semester.findById(semesterId);
      ctx.session.browseSemNumber = semester.number;

      // ✅ Direct query using semesterId
      const subjects = await Subject.find({
        courseId: new mongoose.Types.ObjectId(ctx.session.browseCourseId),
        semesterId: new mongoose.Types.ObjectId(semesterId)
      });

      if (!subjects.length) {
        return ctx.reply("No subjects found for this semester.");
      }

      const buttons = subjects.map(s =>
        Markup.button.callback(s.name, `browse_subject:${s._id}`)
      );

      await ctx.reply("Choose a subject:", Markup.inlineKeyboard(buttons, { columns: 1 }));
      await ctx.reply(
                  "Not found your Subject?",
                  Markup.inlineKeyboard([
                    Markup.button.callback("Request To Add", "REQUEST_SUBJECT")
                  ], { columns: 1 })
      );

    } catch (err) {
      console.error(err);
      await ctx.reply("Error fetching subjects.");
    }
  });

  // STEP 3 — User picks a subject → dump all files
  bot.action(/^browse_subject:(.+)$/, async (ctx) => {
    const subjectId = ctx.match[1];
    await ctx.answerCbQuery();

    const courseId = ctx.session.browseCourseId;
    const semesterId = ctx.session.browseSemesterId;

    try {
      const subject = await Subject.findById(subjectId);

      const paper = await Paper.findOne({
        courseId: new mongoose.Types.ObjectId(courseId),
        subjectId: new mongoose.Types.ObjectId(subjectId),
        semesterId: new mongoose.Types.ObjectId(semesterId),
      });

      if (!paper || !paper.files.length) {
        return await ctx.reply("No files found for this subject yet.",
          Markup.inlineKeyboard([
                      Markup.button.callback("Report To Admin", "REQUEST_File")
                    ], { columns: 1 }));
      }

      // ✅ Summary message
      await ctx.reply(
        `📚 Files for:\n\n` +
        `Course   : ${ctx.session.browseCourseName}\n` +
        `Semester : ${ctx.session.browseSemNumber}\n` +
        `Subject  : ${subject.name}\n\n` +
        `📦 Total files: ${paper.files.length}\n` +
        `Sending now...`
      );

      // ✅ Dump all files
      for (const file of paper.files) {
        try {
          if (file.fileType === "pdf") {
            await ctx.replyWithDocument(
              { url: file.url },
              { caption: `📄 ${subject.name}`, filename: `${subject.name}.pdf` }
            );
          } else if (file.fileType === "image") {
            await ctx.replyWithPhoto(
              { url: file.url },
              { caption: `🖼️ ${subject.name}` }
            );
          } else {
            await ctx.replyWithDocument(
              { url: file.url },
              { caption: `📎 ${subject.name}` }
            );
          }
        } catch (fileErr) {
          console.error("Failed to send file:", fileErr.message);
          await ctx.reply("❌ Failed to send one of the files.");
        }
      }

      await ctx.reply(`✅ All ${paper.files.length} file(s) sent!`);

      // Clear browse session
      ctx.session.browseCourseId = null;
      ctx.session.browseCourseName = null;
      ctx.session.browseSemNumber = null;
      ctx.session.browseSemesterId = null;

    } catch (err) {
      console.error(err);
      await ctx.reply("❌ Error fetching files.");
    }
  });
}