import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onToggleSidebar: () => void;
}

import useLogout from "../../hooks/useLogout.js"
import { useAuthContext } from "../../context/AuthContext.jsx"

export const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { theme, setTheme } = useTheme();

  const { loading, logout } = useLogout()

  const { authUser } = useAuthContext()
  const isAuth = Boolean(authUser) // true false

  const navigate = useNavigate();

  return (
    <nav className="h-14 border-b border-border bg-card flex items-center justify-between px-4">

      {/* NAVBAR LEFTSIDE */}
      {/* logo and sidebar togglebutton */}
      <div className="flex items-center gap-2">

        {/* toggle sidebar button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* 🔥 LOGO */}
        <div>
          <img
            src="/omniagent-logo.png"
            alt="OmniAgent Logo"
            className="h-10 w-auto"
          />
        </div>
        <h1 className="text-xl font-bold text-foreground">OmniAgent</h1>
      </div>

      {/* NAVBAR RIGHT SIDE */}
      <div className="flex items-center gap-2">

        {/* THEME BUTTON */}
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

        {/* SIGNUP LOGIN AND LOGOUT BUTTON */}
        {!isAuth ? (
          // singup & login button
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
          // logout button
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
