import mongoose from "mongoose";
import axios from "axios";
import { Readable } from "stream";
import cloudinary from "../../configs/cloudinaryConfig.js";
import Paper from "../../schemas/paperSchema.js";
import Subject from "../../schemas/subjectSchema.js";

const MAX_FILES = 5;
const ALLOWED_MIME_TYPES = [
  "application/pdf",      // PDF
  "image/jpeg",           // JPG
  "image/jpg",            // JPG
  "image/png",            // PNG
  "image/webp",           // WebP
];

export function subjectHandler(bot) {

  // STEP 3 — User picks a subject → confirmation + instructions
  bot.action(/^upload_subject:(.+)$/, async (ctx) => {
    const subjectId = ctx.match[1];
    await ctx.answerCbQuery();

    ctx.session = ctx.session || {};

    const subject = await Subject.findById(subjectId);

    ctx.session.pendingUpload = {
      subjectId,
      courseId: ctx.session.courseId,
      semesterId: ctx.session.semesterId,
      fileCount: 0,
    };

    await ctx.reply(
      `You have selected:\n\n` +
      `Course   : ${ctx.session.courseName}\n` +
      `Semester : ${ctx.session.semNumber}\n` +
      `Subject  : ${subject.name}\n\n` +
      `***** Upload Instruction *****\n\n`+
      `1. Please send your files one by one.\n` +
      `2. You can upload up to ${MAX_FILES} files per subject\n` +
      `3. Supported types: PDF, JPG, PNG, WebP\n` +
      `4. Send /done when you are finished.\n\n` +
      `You can send now...`
    );
  });

  // STEP 4 — User sends a file → validate → upload to Cloudinary → save to DB
  bot.on(["document", "photo"], async (ctx) => {

    if (!ctx.session?.pendingUpload) return;

    const { subjectId, courseId, semesterId } = ctx.session.pendingUpload;
    const fileCount = ctx.session.pendingUpload.fileCount;

    // Check file limit
    if (fileCount >= MAX_FILES) {
      return ctx.reply(`⚠️ Maximum limit of ${MAX_FILES} files reached. Send /done to finish.`);
    }

    try {
      let fileId, fileType, mimeType;

      if (ctx.message.document) {
        mimeType = ctx.message.document.mime_type;

        // ✅ Validate mime type
        if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
          return ctx.reply(
            `❌ File type not allowed.\n\n` +
            `📁 Only these types are accepted:\n` +
            `• PDF (.pdf)\n` +
            `• Image (.jpg, .png, .webp)\n\n` +
            `Please send a valid file.`
          );
        }

        fileId = ctx.message.document.file_id;
        fileType = mimeType === "application/pdf" ? "pdf" : "image";

      } else if (ctx.message.photo) {
        // Photos sent as photo type are always JPEG — always valid
        const photos = ctx.message.photo;
        fileId = photos[photos.length - 1].file_id;
        fileType = "image";
        mimeType = "image/jpeg";
      }

      await ctx.reply("⏳ Uploading your file, please wait...");

      // Get file URL from Telegram
      const fileUrl = await ctx.telegram.getFileLink(fileId);

      // Download file as buffer
      const response = await axios.get(fileUrl.href, { responseType: "arraybuffer" });
      const buffer = Buffer.from(response.data);

      // Upload to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "MDQs",
            resource_type: fileType === "pdf" ? "raw" : "image",
            format: fileType === "pdf" ? "pdf" : undefined,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        Readable.from(buffer).pipe(uploadStream);
      });

      // Save to DB
      await Paper.findOneAndUpdate(
        {
          courseId: new mongoose.Types.ObjectId(courseId),
          subjectId: new mongoose.Types.ObjectId(subjectId),
          semesterId: new mongoose.Types.ObjectId(semesterId),
        },
        {
          $push: {
            files: {
              publicId: uploadResult.public_id,
              url: uploadResult.secure_url,
              fileType,
            }
          }
        },
        { upsert: true, new: true }
      );

      ctx.session.pendingUpload.fileCount += 1;
      const newCount = ctx.session.pendingUpload.fileCount;

      await ctx.reply(
        `✅ File ${newCount} uploaded! (${newCount}/${MAX_FILES})\n` +
        (newCount < MAX_FILES
          ? `📎 Send the next file or /done to finish.`
          : `🔢 Maximum limit reached. Send /done to finish.`)
      );

    } catch (err) {
      console.error("Upload error:", err);
      await ctx.reply("❌ Upload failed, please try again.");
    }
  });

  // STEP 5 — /done command → finish session
  bot.command("done", async (ctx) => {
    if (!ctx.session?.pendingUpload) {
      return ctx.reply("No active upload session found.");
    }

    const count = ctx.session.pendingUpload.fileCount;
    ctx.session.pendingUpload = null;

    await ctx.reply(
      `Upload complete!\n` +
      `Total files uploaded: ${count}\n\n` +
      `Thank you for contributing! 🙏`
    );
  });
}