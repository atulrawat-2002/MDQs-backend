import mongoose from "mongoose";
import cloudinary from "./src/configs/cloudinaryConfig.js";
import Paper from "./src/schemas/paperSchema.js";
import { connectDB } from "./src/configs/dbConfig.js";

async function cleanPdfs() {
  try {
    await connectDB();
    console.log("Connected to DB");

    // Find all papers with pdf files
    const papers = await Paper.find({ "files.fileType": "pdf" });

    for (const paper of papers) {
      for (const file of paper.files) {
        if (file.fileType === "pdf") {
          // Delete from Cloudinary
          try {
            await cloudinary.uploader.destroy(file.publicId, {
              resource_type: "raw"
            });
            console.log("Deleted from Cloudinary:", file.publicId);
          } catch (err) {
            console.log("Could not delete from Cloudinary:", file.publicId);
          }
        }
      }

      // Remove all pdf files from this paper in DB
      await Paper.findByIdAndUpdate(paper._id, {
        $pull: { files: { fileType: "pdf" } }
      });
      console.log("Cleaned paper:", paper._id);
    }

    console.log("✅ Cleanup complete! Re-upload PDFs now.");
  } catch (err) {
    console.error("Cleanup failed:", err.message);
  } finally {
    await mongoose.connection.close();
  }
}

cleanPdfs();