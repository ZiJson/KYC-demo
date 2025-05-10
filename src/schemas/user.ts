import { z } from "zod";

export const GENDER = ["Male", "Female", "Prefer not to say"] as const;

export const userSchema = z.object({
  name: z.string().nonempty("Required"),
  email: z.string().email().nonempty("Required"),
  phone: z
    .string()
    .nonempty("Required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"), // E.164 format
  nationality: z
    .string({
      required_error: "Required",
      invalid_type_error: "Required",
    })
    .nonempty("Required"),
  gender: z.enum(GENDER).nullable(),
  address: z.string(),
  birthdate: z
    .number({
      required_error: "Required",
      invalid_type_error: "Required",
    })
    .min(1, "Required"),
});
