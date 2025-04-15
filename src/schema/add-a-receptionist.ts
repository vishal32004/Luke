import { z } from "zod";

export const receptionistFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    team: z.string().min(1, "Team is required"),
    client: z.string().min(1, "Client is required"),
});