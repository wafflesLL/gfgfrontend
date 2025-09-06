import { z } from 'zod';

export const SignInSchema = z.object({
        email: z
            .string()
            .trim()
            .email("Enter a valid email.")
            .transform(v => v.toLowerCase()),
        password: z.string().min(1),
});

export type SignInData = z.infer<typeof SignInSchema>;
