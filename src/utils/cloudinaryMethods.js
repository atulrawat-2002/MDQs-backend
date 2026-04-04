import cloudinary from "../configs/cloudinaryConfig.js";

// ✅ helper to generate signed URL for raw files
export function getSignedUrl(publicId) {
  return cloudinary.url(publicId, {
    resource_type: "raw",
    type: "upload",
    sign_url: true,           // ✅ signs the URL
    secure: true,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 10, // expires in 10 mins
  });
}