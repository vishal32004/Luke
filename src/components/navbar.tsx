import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user"; // Assuming you've moved the NavUser component to this file
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();
//   const { isMobile } = useSidebar();

  // Sample user data - replace with your actual user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  };

  // Format the current path for breadcrumb
  const formatPathName = (path: string) => {
    if (!path) return "";

    // Remove leading slash and split by slash
    const parts = path.replace(/^\/+/, "").split("/");

    // Get the last part of the path
    const lastPart = parts[parts.length - 1];

    // Convert to title case and replace hyphens with spaces
    return lastPart
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const currentPath = formatPathName(location.pathname);

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{currentPath || "Dashboard"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-4">
        <NavUser user={user} />
      </div>
    </header>
  );
}
