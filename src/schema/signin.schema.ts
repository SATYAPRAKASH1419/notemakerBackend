import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type TSigninUserInput = z.infer<typeof SigninSchema>;