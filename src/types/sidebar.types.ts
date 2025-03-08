import { LucideIcon } from "lucide-react"
type NavItem = {
    id: string;
    title: string;
    url: string;
    icon: LucideIcon;
    isActive: boolean;
    subItems?: subItems[];
};

type subItems = {
    id: string;
    title: string;
    url: string;
};

type User = {
    name: string;
    email: string;
    avatar: string;
};

export type SidebarData = {
    user: User;
    navMain: NavItem[];
};