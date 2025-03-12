import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Campaign",
      url: "#",
      items: [
        {
          title: "Start New Campaign",
          url: "#",
        },
        {
          title: "View Campaign",
          url: "#",
        },
        {
          title: "Active Campaign",
          url: "#",
        },
        {
          title: "Finished  Campaign",
          url: "#",
        },
        {
          title: "Top Campaign",
          url: "#",
        },
      ],
    },
    {
      title: "Storefront",
      url: "#",
      items: [
        {
          title: "Edit Storefront URL ",
          url: "#",
        },
        {
          title: "Edit Catalouge",
          url: "#",
          isActive: true,
        },
        {
          title: "Add Logo",
          url: "#",
        },
        {
          title: "Change Points Name",
          url: "#",
        },
        {
          title: "Enable Footer",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      items: [
        {
          title: "Reward Points",
          url: "#",
        },
        {
          title: "Reward Code",
          url: "#",
        },
        {
          title: "Recipient Level",
          url: "#",
        },
      ],
    },
    {
      title: "Product Level Reporting",
      url: "#",
      items: [
        {
          title: "Top Products",
          url: "#",
        },
        {
          title: "Top Categories",
          url: "#",
        },
      ],
    },
    {
      title: "Funds Balance",
      url: "#",
      items: [
        {
          title: "View Balance",
          url: "#",
        },
        {
          title: "Add Funds",
          url: "#",
        },
        {
          title: "Transaction History ",
          url: "#",
        },
      ],
    },

    {
      title: "7.	Admins ",
      url: "#",
      items: [
        {
          title: "All Admins",
          url: "#",
        },
        {
          title: "Add New",
          url: "#",
        },
        {
          title: "Delete Existing Admin",
          url: "#",
        },
      ],
    },

    {
      title: "Templates",
      url: "#",
      items: [
        {
          title: "All Templates",
          url: "#",
        },
        {
          title: "Categories",
          url: "#",
        },
      ],
    },
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Luke GIfts</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title} className="py-1">
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
