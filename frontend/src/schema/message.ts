import z from "zod";

export const UserMessageSchema = z.object({
  message: z.string().min(2).max(60),
});

export type UserMessageTypeSchema = z.infer<typeof UserMessageSchema>;
