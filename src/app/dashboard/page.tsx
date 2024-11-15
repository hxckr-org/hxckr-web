import { redirect } from "next/navigation";

import { DashboardLayout } from "@/app/components/layout/dashboard";
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return <DashboardLayout session={session}>Dashboard</DashboardLayout>;
}
