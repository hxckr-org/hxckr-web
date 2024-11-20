import { redirect } from "next/navigation";

import { DashboardLayout } from "@/app/components/layout/dashboard";
import Achievements from "@/app/components/primitives/ProfileAchievements";
import ActivityCalendar from "@/app/components/primitives/ProfileActivityCalendar";
import ProfileChallenges from "@/app/components/primitives/ProfileChallenges";
import DeleteAccount from "@/app/components/primitives/ProfileDeleteAccount";
import GitHubIntegration from "@/app/components/primitives/ProfileGithubIntegration";
import PersonalInformation from "@/app/components/primitives/ProfilePersonalInformation";
import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  const user = session.user;
  const name = user.name ?? "";
  const email = user.email ?? "";
  const picture = user.image ?? "";
  return (
    <DashboardLayout session={session}>
      <div className="flex flex-col gap-6 p-6 font-normal">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PersonalInformation name={name} email={email} picture={picture} />
            <ActivityCalendar />
            <ProfileChallenges />
            <DeleteAccount />
          </div>
          <div className="space-y-6">
            <GitHubIntegration />
            <Achievements />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
