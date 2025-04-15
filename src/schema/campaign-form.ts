import { z } from "zod";

export const formSchema = z
    .object({
        campaignName: z.string().min(2, {
            message: "Campaign name is required",
        }),
        description: z.string().min(2, {
            message: "Description must be at least 2 characters.",
        }),
        forWho: z.string().min(2, { message: "Please Select at least one Option" }),
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