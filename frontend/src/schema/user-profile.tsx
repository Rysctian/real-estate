
import z from "zod"


export const UserUpdateSchema = z.object({
    email: z.string().email().optional().or(z.literal('')),
    username: z.string().optional().or(z.literal('')),
    password: z.string().optional().or(z.literal('')),
    avatar: z.string().optional().or(z.literal('')).nullable(),
});


export type UserUpdateTypeSchema = z.infer<typeof UserUpdateSchema>