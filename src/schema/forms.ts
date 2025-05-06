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


export const formSchema = z
    .object({
        campaignName: z.string().min(2, {
            message: "Campaign name is required",
        }),
        description: z.string(),
        forWho: z.number(),
        EventMainCategory: z
            .string()
            .min(2, { message: "Please Select at least one Option" }),
        event: z.string().min(2, { message: "Please Select at least one Option" }),
        customEvent: z.string().optional(),
        distributionType: z
            .string()
            .min(2, { message: "Please Select at least one Option" }),
        bulkBuyingQty: z
            .string()
            .min(1, { message: "Please Enter A valid Quantity" }),
        rewardType: z
            .string()
            .min(2, { message: "Please Select at least one Option" }),
        points: z.string().min(1, { message: "Please Enter A Valid Option" }),
        valueCodes: z.string().min(2, { message: "Please Enter A Valid Option" }),
        quantity: z.number().min(1, { message: "Please Enter the Quantity" }),
        link: z.string().min(2, {
            message: "A valid Link",
        }),
        advanedDetails: z.boolean().optional(),
        scheduledDate: z.date(),
        personalMessage: z.string().min(2, {
            message: "Too Small",
        }),
        eventAddress: z.string().min(2, {
            message: "Please Add A Valid Address",
        }),
        eventDate: z.date(),
        startDate: z.date(),
        endDate: z.date(),
        sendReminderAfterInitialGift: z.boolean(),
        sendReminderBeforeExpiration: z.boolean(),
        smsContent: z.string(),
        smsCallToAction: z.string(),
        datesInitial: z.string(),
        datesAfter: z.string(),
        emailTemplate: z.string(),
        landingPageTemplate: z.string(),
        selectedReceptionists: z.number().array().nonempty(),
        catalogSelectedProducts: z.array(z.string()),
        catalogFilters: z.object({
            category: z.string(),
            minPrice: z.number(),
            maxPrice: z.number(),
            sortBy: z.enum(["priceLowToHigh", "priceHighToLow", "popularity"]),
        }),
        searchRecipients: z.string()
    })
    .refine(
        (data) => {
            if (data.distributionType === "Bulk Order") {
                return !!data.bulkBuyingQty;
            }
            return true;
        },
        {
            message: "Bulk Buying Quantity is required",
            path: ["bulkBuyingQty"],
        }
    )
    .refine(
        (data) => {
            if (data.rewardType === "Value of Points") {
                return !!data.points;
            }
            return true;
        },
        {
            message: "Points are required",
            path: ["points"],
        }
    )
    .refine(
        (data) => {
            if (data.rewardType === "Bulk Order at Registered office / Event Place") {
                return !!data.eventAddress && !!data.eventDate;
            }
            return true;
        },
        {
            message: "Event Address & Date are required",
            path: ["eventAddress", "eventDate"],
        }
    );



export const adminFormSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        department: z.string().min(1, "Department is required"),
        status: z.enum(["Active", "Inactive"]),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
        giveAccessTo: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });


export const receptionistFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    team: z.string().min(1, "Team is required"),
    client: z.string().min(1, "Client is required"),
});