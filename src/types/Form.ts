import { z } from "zod";
export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    CHECKBOX = "checkbox",
    SELECT = "select",
    DATE_PICKER = "Date",
    COLOR_PICKER = 'COLOR'
}


// Define the campaign form schema with Zod
export const campaignSchema = z.object({
    campaignName: z
        .string()
        .min(3, { message: "Campaign name must be at least 3 characters." }),
    description: z.string().optional(),
    for: z.enum(
        ["internal team", "external client", "channel partners", "others"],
        {
            required_error: "Please select a target group for the campaign.",
        }
    ),
    selectEvent: z
        .enum(["birthday", "annual-event", "other"], {
            required_error: "Please select an event.",
        })
        .optional(),
    addEvent: z
        .string()
        .min(2, { message: "Event name must be at least 2 characters." })
        .optional(),
    onlineOrBulk: z.enum(["Online", "Bulk"], {
        required_error: "Please select an option.",
    }),
    recipients: z
        .string()
        .min(1, { message: "Please select at least one recipient." })
        .optional(),
    recipientsQty: z.string().optional(),
    bulkBuyingQty: z.number().optional(),
    rewardType: z.string().optional(),
    bulkOrderAddress: z.string().optional(),
    eventDate: z.date().optional(),
    selectProduct: z.string().optional(),
    customizeCatalog: z.boolean().optional(),
    customizeLandingPageTemplate: z.boolean().optional(),
    customizeEmailTemplate: z.boolean().optional(),
    customizeSmsTemplate: z.boolean().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    sendReminderAfterInitialGift: z.boolean().optional(),
    sendReminderBeforeExpiration: z.boolean().optional(),
    fundUtilization: z.string(),
});
