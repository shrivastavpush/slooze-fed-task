import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarSeparator, } from "./../components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useLocation, Link } from "react-router-dom";
import { LayoutDashboard, List, PackageMinus, Users, LogOut, Sun, Moon, Settings, Home, ChartColumn, Wallet, BadgeInfo } from "lucide-react";
import { cn } from "./../lib/utils";

const sidebarItems = [
  {
    label: "Home",
    icon: Home,
    path: "/",
    alwaysVisible: false,
  },
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    alwaysVisible: true,
  },
  {
    label: "Products",
    icon: List,
    path: "/products",
    alwaysVisible: true,
  },
  {
    label: "Analytics",
    icon: ChartColumn,
    path: "/analytics",
    alwaysVisible: true,
  },
  {
    label: "Finance",
    icon: Wallet,
    path: "/finance",
    alwaysVisible: true,
  },
  {
    label: "Account Settings",
    icon: Settings,
    path: "/settings",
    alwaysVisible: true,
  },
  {
    label: "Help",
    icon: BadgeInfo,
    path: "/help",
    alwaysVisible: true,
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const [theme, toggleTheme] = useTheme();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-center text-xl mb-2">BitStore</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const isDashboard = item.label === "Dashboard";
                const isStorekeeper = user && user.role === "storekeeper";
                const isActive = location.pathname.startsWith(item.path);
                const disabled = isDashboard && isStorekeeper;

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive && !disabled}
                      disabled={disabled}
                      className={cn(
                        "w-full",
                        disabled &&
                        "opacity-50 pointer-events-none cursor-not-allowed select-none"
                      )}
                    >
                      {disabled ? (
                        <span className="flex items-center gap-2 w-full">
                          <item.icon size={20} />
                          <span>{item.label}</span>
                        </span>
                      ) : (
                        <Link
                          to={item.path}
                          className="flex items-center gap-2 w-full"
                        >
                          <item.icon size={20} />
                          <span>{item.label}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-2 mt-auto border-t border-border pt-4">
        <SidebarSeparator />
        <div className="flex flex-col gap-3 px-2">
          <button
            className="flex items-center gap-2 px-2 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-primary transition"
            onClick={toggleTheme}
            aria-label="Switch Theme"
            type="button"
          >
            {theme === "light" ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
            <span>{theme === "light" ? "Dark" : "Light"} Mode</span>
          </button>
          <button
            className="flex items-center gap-2 px-2 py-2 rounded-md text-destructive hover:underline transition"
            onClick={logout}
            type="button"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
