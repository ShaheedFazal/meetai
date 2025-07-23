"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";

interface DashboardNavbarProps {
  onSearchClick: () => void;
}

export const DashboardNavbar = ({ onSearchClick }: DashboardNavbarProps) => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  
  return (
    <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="size-9"
      >
        {(state === "collapsed" && !isMobile) ? <PanelLeftIcon className="size-4"/> : <PanelLeftCloseIcon className="size-4"/>}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onSearchClick}
        className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
      >
        <SearchIcon className="size-4 mr-2" />
        Search...
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    </nav>
  );
};

