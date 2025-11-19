import { Home, Plus, Youtube, FileText } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
}

const navItems = [
  { title: "Home", icon: Home, path: "/" },
  { title: "Create", icon: Plus, path: "/create" },
  { title: "AI YouTube", icon: Youtube, path: "/ai-youtube" },
  { title: "AI PDF", icon: FileText, path: "/ai-pdf" },
];

export const Sidebar = ({ isCollapsed }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "h-[calc(100vh-3.5rem)] bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-56"
      )}
    >
      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            activeClassName="bg-sidebar-accent text-primary font-medium"
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
