"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardCommand } from "@/modules/dashboard/ui/components/dashboard-command";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar onSearchClick={() => setCommandOpen(true)} />
        {children}
      </div>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
    </SidebarProvider>
  );
};

export const HomeView = () => {
  const trpc = useTRPC();
  const { data, isLoading, error } = useQuery({
    ...trpc.hello.queryOptions({ text: "client" }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <p>{data?.greeting}</p>
    </div>
  );
};

export default Layout;
