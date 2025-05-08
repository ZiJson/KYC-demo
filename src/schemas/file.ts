import { z } from "zod";

export const fileSchema = z.object({
  idCardFront: z.instanceof(File).nullable(),
  idCardBack: z.instanceof(File).nullable(),
  extraDocs: z.array(z.instanceof(File)),
});
