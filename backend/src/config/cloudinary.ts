import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// CLOUDINARY CONFIGURE
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.API_KEY!,
  api_secret: process.env.API_SECRET!,
});

// CHECK IF THE CONNECTION ESTABLISH TO THE CLODINARY OR NOT
export const testCloudinaryConnection = async () => {
  try {
    const response = await cloudinary.api.ping();
    console.log("Cloudinary Connected Successfully:", response.status);
  } catch (error: any) {
    console.error("Cloudinary Connection Failed:", error.message || error);
  }
};

export const uploadToCloudinary = (
  buffer: Buffer,
  filename: string
): Promise<{ secure_url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const sanitizedName = (filename.split(".")[0] ?? "file").replace(/\s+/g, "_");
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "hireiq/resumes",
        resource_type: "raw",
        format:"pdf",
        public_id: `resume_${Date.now()}_${sanitizedName}`,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary returned no result"));

        //  TypeScript now knows result is defined here
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};