import { redirect } from "next/navigation";

import { DashboardLayout } from "@/app/components/layout/dashboard";
import { ChallengesUI } from "@/app/components/sections/challenges";
import { auth } from "@/auth";

export default async function Challenges() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  return (
    <DashboardLayout session={session}>
      <ChallengesUI />
    </DashboardLayout>
  );
}
