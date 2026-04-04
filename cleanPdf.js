import cloudinary from "./src/configs/cloudinaryConfig.js";
import mongoose from "mongoose";
import { connectDB } from "./src/configs/dbConfig.js";
import Paper from "./src/schemas/paperSchema.js";

async function cleanCloudinary() {
  try {
    await connectDB();
    console.log("Connected to DB");

    // ── Step 1: Delete all images from Cloudinary MDQs folder
    const imageResult = await cloudinary.api.delete_resources_by_prefix("MDQs/", {
      resource_type: "image",
    });
    console.log("✅ Images deleted from Cloudinary:", imageResult);

    // ── Step 2: Delete all raw files (PDFs) from Cloudinary MDQs folder
    const rawResult = await cloudinary.api.delete_resources_by_prefix("MDQs/", {
      resource_type: "raw",
    });
    console.log("✅ Raw files deleted from Cloudinary:", rawResult);

    // ── Step 3: Delete the MDQs folder itself
    await cloudinary.api.delete_folder("MDQs");
    console.log("✅ MDQs folder deleted from Cloudinary");

    // ── Step 4: Clear all papers from DB
    await Paper.deleteMany();
    console.log("✅ All papers cleared from DB");

    console.log("🎉 Cloudinary and DB cleanup complete!");

  } catch (error) {
    console.error("Cleanup failed:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("DB connection closed");
  }
}

cleanCloudinary();