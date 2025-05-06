import { Template, LandingPageTemplate } from "@/types/templates";
import { StateCreator } from "zustand";
import axios from "axios";
export interface CampaignFormStore {
    events: Array<{ label: string; value: string; }>;
    subEvents: Array<{ label: string; value: string; }>;
    emailTemplates: Template[];
    landingPageTemplates: LandingPageTemplate[];
    loadEvents: (category: number) => Promise<boolean>;
    loadEmailTemplate: (category: string) => boolean
    loadLandingPageTemplate: (category: string) => boolean
}

const initialState: Omit<CampaignFormStore, 'loadEvents' | 'loadSubEvents' | 'loadEmailTemplate' | 'loadLandingPageTemplate'> = {
    events: [],
    subEvents: [],
    emailTemplates: [],
    landingPageTemplates: []
};


export const createCampaignFormSlice: StateCreator<CampaignFormStore> = (set) => ({
    ...initialState,

    loadEvents: async (categoryId: number) => {
        try {
            const response = await axios.post("http://localhost:3000/api/events", {
                recipient_type_id: categoryId,
            });

            const data = response.data;

            const events = data.map((event: any) => ({
                label: event.name,
                value: event.id,
            }));

            console.log(events,'events')

            set({ events });
            return true;
        } catch (error) {
            console.error("Failed to load events:", error);
            return false;
        }
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
