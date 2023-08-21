import { z } from "zod";

export const RegisterValidator = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be longer than 3 characters" })
    .max(20, { message: "Username must be less than 20 characters" }),
  email: z
    .string()
    .email({ message: "Email must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be longer than 8 characters" })
});

export type RegisterRequest = z.infer<typeof RegisterValidator>;