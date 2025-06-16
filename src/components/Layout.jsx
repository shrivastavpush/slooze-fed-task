import React from "react";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";

export default function Layout({ children, className = "" }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground transition-colors duration-200">
        <AppSidebar />
        <div className="flex-1 ml-0 transition-all duration-200 ease-in-out md:data-[collapsed=true]:ml-[--sidebar-width-icon]">
          <SidebarInset className="min-h-screen w-full">
            <main className={`p-4 md:p-6 w-full max-w-[2000px] mx-auto ${className}`}>
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
