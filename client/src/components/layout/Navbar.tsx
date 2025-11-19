import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">OmniAgent</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="hover:bg-accent"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        
        {!isAuthenticated ? (
          <>
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={logout}
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};
