import { Outlet } from "react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AppLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar />

        <SidebarInset>
          <Navbar />

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
