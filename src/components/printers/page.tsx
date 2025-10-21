

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
} from "../ui/sidebar"
import { SidebarNav } from "../dashboard/sidebar-nav"
import { PrintersClient } from "../printers/printers-client"
import { Box } from "lucide-react"
import { WorkspaceProvider } from "../../hooks/workspace-context"

export default function PrintersPage() {
  return (
    <WorkspaceProvider>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-3 p-1">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Box className="h-6 w-6" />
              </div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">
                PrintView
              </h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <PrintersClient />
        </SidebarInset>
      </SidebarProvider>
    </WorkspaceProvider>
  )
}


