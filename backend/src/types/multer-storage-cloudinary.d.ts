// declare module "multer-storage-cloudinary" {
//   import { v2 as cloudinaryType } from "cloudinary";
//   import { StorageEngine, type Multer } from "multer";

//   interface CloudinaryStorageOption {
//     cloudinary: typeof cloudinaryType;
//     params?:
//       | Record<string, unknown>
//       | ((
//           req: Express.Request,
//           file: Express.Multer.File
//         ) => Promise<Record<string, unknown>>);
//   }

//   export class CloudinaryStorage implements StorageEngine {
//     constructor(options: CloudinaryStorageOption);

//     _handleFile(
//       req: Express.Request,
//       file: Express.Multer.File,
//       callback: (error?: any, info?: Partial<Express.Multer.File>) => void
//     ): void;

//     _removeFile(
//       req: Express.Request,
//       file: Express.Multer.File,
//       callback: (error: Error | null) => void
//     ): void;
//   }
// }
