import * as React from "react";
import {
  Camera,
  // Home,
  BarChart2,
  ShoppingCart,
  DollarSign,
  Users,
  FileText,
  Settings,
  Command,
} from "lucide-react";

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
import { NavUser } from "./nav-user";

// This is sample data

const data = {
  user: {
    name: "Vishal Tiwari",
    email: "vishal@df.com",
    avatar: "https://www.digitalfueled.com/assets/images/logo.png",
  },
  navMain: [
    {
      title: "Campaign",
      Icon: Camera, // You can change this to a different icon
      url: "#",
      items: [
        {
          title: "Start New Campaign",
          url: "/create-new-campaign",
        },
        {
          title: "View Campaign",
          url: "/view-campaign",
        },
        {
          title: "Active Campaign",
          url: "#",
        },
        {
          title: "Finished Campaign",
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
      Icon: ShoppingCart, // Changed to ShoppingCart icon
      url: "#",
      items: [
        {
          title: "Edit Storefront URL",
          url: "/storefront",
        },
        {
          title: "Edit Catalogue",
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
      Icon: BarChart2, // Changed to BarChart2 icon
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
      Icon: FileText, // Changed to FileText icon
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
      Icon: DollarSign, // Changed to DollarSign icon
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
          title: "Transaction History",
          url: "#",
        },
      ],
    },
    {
      title: "Admins",
      Icon: Users, // Changed to Users icon
      url: "/admins",
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
      Icon: Settings, // Changed to Settings icon
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
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
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
                  <SidebarMenuItem key={item.title}>
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
                      className="px-2.5 md:px-2 cursor-pointer"
                    >
                      <item.Icon />
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
        <SidebarHeader className="gap-3.5 border-b  py-[1.234rem]">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem?.title}
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {activeItem?.items?.map((subItem) => (
                <a
                  href={subItem.url}
                  key={subItem.title}
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{subItem.title}</span>
                  </div>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
