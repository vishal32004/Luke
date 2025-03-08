import * as React from "react";
import { ArchiveX, Command, File, Inbox, Send } from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarData } from "@/types/sidebar.types";
import { Link } from "react-router-dom";

// This is sample data
const data: SidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      id: "send-rewards",
      title: "Send Rewards",
      url: "/send-rewards",
      icon: Send,
      isActive: true,
      subItems: [
        {
          id: "rewards-points",
          title: "Rewards Points",
          url: "/dashboard/send-rewards/points",
        },
        {
          id: "rewards-codes",
          title: "Rewards Codes",
          url: "/dashboard/send-rewards/codes",
        },
      ],
    },
    {
      id: "reports",
      title: "Reports",
      url: "/reports",
      icon: File,
      isActive: false,
      subItems: [
        {
          id: "reports-points",
          title: "Rewards Points",
          url: "/reports/points",
        },
        { id: "reports-codes", title: "Reward Code", url: "/reports/codes" },
      ],
    },
    {
      id: "payments",
      title: "Payments",
      url: "/payments",
      icon: Inbox,
      isActive: false,
      subItems: [
        {
          id: "payments-balance",
          title: "Wallet Balance",
          url: "/payments/balance",
        },
        {
          id: "payments-history",
          title: "Transaction History",
          url: "/payments/history",
        },
      ],
    },
    {
      id: "settings",
      title: "Settings",
      url: "/settings",
      icon: ArchiveX,
      isActive: false,
      subItems: [
        { id: "settings-account", title: "Account", url: "/settings/account" },
        { id: "settings-admins", title: "Admins", url: "/settings/admins" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {activeItem.subItems?.map((link) => (
                <Link
                  to={link.url}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                  key={link.id}
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{link.title}</span>{" "}
                  </div>
                </Link>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
