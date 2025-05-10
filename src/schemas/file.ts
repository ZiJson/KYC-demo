import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_TOTAL_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const fileZod = z
  .custom<File>()
  .refine((file) => file instanceof File, {
    message: "Required",
  })
  .refine((file) => file?.type && ACCEPTED_FILE_TYPES.includes(file.type), {
    message: "Unsupported file type",
  })
  .refine((file) => file?.size && file.size <= MAX_FILE_SIZE, {
    message: "File size must be less than 5MB",
  });

const fileListZod = z
  .custom<File[]>()
  .refine(
    (files) =>
      Array.isArray(files) &&
      files.every((f) => ACCEPTED_FILE_TYPES.includes(f.type)),
    {
      message: "Include unsupported file type",
    },
  )
  .refine(
    (files) =>
      files.reduce((sum, file) => sum + file.size, 0) <= MAX_TOTAL_FILE_SIZE,
    {
      message: "Max total size: 10MB",
    },
  );

export const fileSchema = z.object({
  idCardFront: fileZod,
  idCardBack: fileZod,
  extraDocs: fileListZod,
});
