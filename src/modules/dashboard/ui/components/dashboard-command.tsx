"use client";

import { useEffect } from "react";
import { 
  CommandDialog,
  CommandInput, 
  CommandList, 
  CommandItem,
  CommandEmpty,
  CommandGroup
} from "@/components/ui/command";

interface DashboardCommandProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DashboardCommand({ open, setOpen }: DashboardCommandProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Search"
      description="Search for meetings and agents"
    >
      <CommandInput placeholder="Find a meeting or agent..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <span>Create new meeting</span>
          </CommandItem>
          <CommandItem>
            <span>Create new agent</span>
          </CommandItem>
          <CommandItem>
            <span>View all meetings</span>
          </CommandItem>
          <CommandItem>
            <span>View all agents</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}