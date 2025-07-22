import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <div className="flex flex-col h-screen w-screen bg-muted">
                <Sidebar />
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </SidebarProvider>
    );
};

export default Layout;
