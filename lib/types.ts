import { z } from 'zod';

export const SignInSchema = z.object({
        username: z
            .string(),
        password: z.string().min(1),
});

export type SignInData = z.infer<typeof SignInSchema>;

export interface ApiResponse {
    // Add properties based on your API response structure
    id: string;
    // ... other properties
}