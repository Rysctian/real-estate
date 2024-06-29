import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginTypeSchema = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),

  email: z
    .string()
    .email("Invalid email address")
    .min(8, { message: "Email must be at least 8 characters long" })
    .max(50, { message: "Email must be at most 50 characters long" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" }),

  contactNumber: z
    .string()
    .min(11, { message: "Contact number must be at least 11 characters long" })
    .max(11, { message: "Contact number must be at most 11 characters long" })
    .regex(/^\d+$/, { message: "Contact number must contain only digits" }),
});

export type RegisterTypeSchema = z.infer<typeof RegisterSchema>;
