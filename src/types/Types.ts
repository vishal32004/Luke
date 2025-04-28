export type EventType = "birthday" | "trip" | "meeting" | "party" | "dinner" | "holiday" | "other"

export interface Event {
    id: string
    title: string
    date: string // ISO date string
    time?: string // Optional time string
    type: EventType
    description?: string
    location?: string
}
