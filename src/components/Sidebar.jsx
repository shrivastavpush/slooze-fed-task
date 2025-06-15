import { Home, List, Sun, Moon, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const menu = [
  { label: "Dashboard", path: "/dashboard", roles: ["manager"] },
  { label: "View Products", path: "/products", roles: ["manager", "keeper"] },
];

const iconMap = {
  "Dashboard": <Home size={20} />,
  "View Products": <List size={20} />,
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [theme, toggleTheme] = useTheme();
  const location = useLocation();

  return (
    <aside className="h-screen w-64 bg-card border-r border-border flex flex-col justify-between">
      <div>
        <div className="py-6 px-6 font-extrabold text-xl tracking-tight">Slooze Retail</div>
        <nav className="mt-8">
          <ul className="space-y-1">
            {menu.map(item => (
              item.roles.includes(user?.role || "") && (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-6 py-2 rounded-md transition-colors",
                      location.pathname.startsWith(item.path)
                        ? "bg-accent font-bold"
                        : "hover:bg-muted font-medium"
                    )}
                  >
                    {iconMap[item.label]}
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            ))}
          </ul>
        </nav>
      </div>
      <div className="px-6 py-4 flex justify-between items-center border-t border-border">
        <button
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
          onClick={toggleTheme}
          aria-label="Switch Theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          <span>{theme === "light" ? "Dark" : "Light"} Mode</span>
        </button>
        <button
          className="flex items-center gap-2 text-destructive hover:underline transition"
          onClick={logout}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
