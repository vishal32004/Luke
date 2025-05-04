import { Template, LandingPageTemplate } from "@/types/templates";
import { StateCreator } from "zustand";

export interface CampaignFormStore {
    events: Array<{ label: string; value: string; }>;
    subEvents: Array<{ label: string; value: string; }>;
    emailTemplates: Template[];
    landingPageTemplates: LandingPageTemplate[];
    loadEvents: (category: string) => boolean;
    loadSubEvents: (event: string) => boolean;
    loadEmailTemplate: (category: string) => boolean
    loadLandingPageTemplate: (category: string) => boolean
}

const initialState: Omit<CampaignFormStore, 'loadEvents' | 'loadSubEvents' | 'loadEmailTemplate' | 'loadLandingPageTemplate'> = {
    events: [],
    subEvents: [],
    emailTemplates: [],
    landingPageTemplates: []
};


export const createCampaignFormSlice: StateCreator<CampaignFormStore> = (set, get) => ({
    ...initialState,

    loadEvents: (category: string) => {
        // Replace this mock logic with actual API/data call
        console.log(category)
        const events = [
            { label: "Webinar", value: "webinar" },
            { label: "Workshop", value: "workshop" },
        ];
        set({ events });
        return true
    },

    loadSubEvents: (event: string) => {
        console.log(event)
        const subEvents = [
            { label: "Q&A", value: "qna" },
            { label: "Demo", value: "demo" },
        ];
        set({ subEvents });
        return true
    },

    loadEmailTemplate: (category: string) => {
        console.log(category)
        const emailTemplates = [{
            id: "1",
            value: "1",
            title: "Birthday-1",
            category: "Birthday",
            subCategory: "Personal",
            imageUrl: "images/bbanner.webp",
            content: "Happy Birthday! Wishing you a fantastic day filled with joy and celebration.",
        },]
        set({ emailTemplates });
        return true
    },

    loadLandingPageTemplate: (category: string) => {
        console.log(category)
        const landingPageTemplates = [{
            id: "registration",
            name: "Registration Thank You",
            category: "onboarding",
            thumbnail: "/placeholder.svg?height=200&width=300",
            elements: {
                logo: "/placeholder.svg?height=40&width=120",
                title: "Thank you for registering!",
                description: "We have a little something for you as a token of appreciation.",
                buttonText: "Claim your reward",
                buttonLink: "/claim",
                bannerImage:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/350c375-Screenshot_2024-05-13_at_6.27.57_PM-KsbDgU7JZ7Qc6WfKoSYk1Tk42EFdgq.png",
                footerText: "How to redeem?",
                textColor: "dark",
                buttonStyle: "primary",
                buttonSize: "default",
                textAlignment: "center",
                contentSpacing: "default",
                animation: "none",
                overlay: "none",
            },
        },]
        set({ landingPageTemplates });
        return true
    },
});
