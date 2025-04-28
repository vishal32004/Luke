export const calculateTotal = (points: number) => {
    const conversionRate = 1;
    return points * conversionRate;
};

export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    }).format(date)
}

export function formatTime(timeString: string): string {
    // Handle simple time strings like "10:00"
    if (timeString.includes(":")) {
        const [hours, minutes] = timeString.split(":").map(Number)
        const period = hours >= 12 ? "PM" : "AM"
        const hour12 = hours % 12 || 12
        return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`
    }
    return timeString
}
