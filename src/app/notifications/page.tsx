import { redirect } from "next/navigation";

import { DashboardLayout } from "@/app/components/layout/dashboard";
import { auth } from "@/auth";

export default async function NotificationsPage() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  return <DashboardLayout session={session}>NotificationsPage</DashboardLayout>;
}
