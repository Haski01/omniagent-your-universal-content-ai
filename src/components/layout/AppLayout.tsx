import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className="flex w-full">
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
