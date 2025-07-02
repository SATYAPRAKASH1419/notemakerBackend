import { z } from "zod";

export const RegisterSchema = z.object({
  fname: z.string(),
  lname: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type TRegisterUserInput = z.infer<typeof RegisterSchema>;

