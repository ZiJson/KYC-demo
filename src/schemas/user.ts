import { z } from "zod";

export enum Gender {
  Male = "Male",
  Female = "Female",
  PreferNotToSay = "Prefer not to say",
}

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number (E.164 format)"), // E.164 format
  nationality: z.string(),
  gender: z.nativeEnum(Gender).nullable(),
  address: z.string(),
  birthdate: z.date(),
});
