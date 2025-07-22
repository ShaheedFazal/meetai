import { auth } from "@/lib/auth";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { headers } from "next/headers"; 
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }
  return <DashboardSidebar />;
};

export default Page;