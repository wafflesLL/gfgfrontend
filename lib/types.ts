import { z } from 'zod';

export const SignInSchema = z.object({
        username: z
            .string(),
        password: z.string().min(1),
});

export type SignInData = z.infer<typeof SignInSchema>;

export const CreateAccountSchema = z.object({
        username: z
            .string(),
        email: z
            .string()
            .trim()
            .email("Enter a valid email.")
            .transform(v => v.toLowerCase()),
        password: z.string().min(1),
});

export type CreateAccountData = z.infer<typeof CreateAccountSchema>;