import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }),
});




export const signupFormSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters long."),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });
