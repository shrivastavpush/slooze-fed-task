
import React from "react";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 ml-0 transition-all duration-200 ease-in-out md:data-[collapsed=true]:ml-[--sidebar-width-icon]">
          <SidebarInset className="min-h-screen w-full">
            <div className="p-4 md:p-6 w-full max-w-[2000px] mx-auto">
              {children}
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
