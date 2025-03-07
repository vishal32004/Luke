import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const Dashboard = () => {
  return (
    <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "350px",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
    </div>
  )
}

export default Dashboard