import { redirect } from "next/navigation";
import { DashboardLayout } from "@/app/components/layout/dashboard";
import { auth } from "@/auth";
import Image from "next/image";
import { ChevronDownIcon } from "@/public/assets/icons";
import { FirstPlaceIcon, SecondPlaceIcon, ThirdPlaceIcon } from "@/public/assets/icons/place-icons";

export default async function LeaderboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  return (
    <DashboardLayout session={session}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Leaderboard</h1>
            <p className="text-gray-600">Hey!!! No pressure, its just a leaderboard really</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <select className="px-4 py-2 pr-10 bg-white border rounded-full w-[120px] appearance-none">
                <option>All time</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            <div className="relative">
              <select className="px-4 py-2 pr-10 bg-white border rounded-full w-[120px] appearance-none">
                <option>Global</option>
                <option>Local</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex">
            <button className="px-6 py-2 bg-white text-purple-600 border-[1.5px] border-[#DBE1E7] rounded-l-lg">Challenge</button>
            <button className="px-6 py-2 text-gray-500 border-[1.5px] border-[#DBE1E7] border-l-0 rounded-r-lg">Streak</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#DBE1E7]">
          <div className="grid grid-cols-[80px_2fr_1fr_1fr] p-4 bg-[#F5F5F5] border-b border-[#DBE1E7] items-center">
            <div className="text-gray-600"><b>Username</b></div>
            <div></div>
            <div className="text-gray-600 text-center"><b>Challenges Completed</b></div>
            <div className="text-gray-600 text-right"><b>Points</b></div>
          </div>

          {[...Array(6)].map((_, index) => {
            const rank = index + 1;
            const isCurrentUser = rank === 4;

            return (
              <div 
                key={rank}
                className={`grid grid-cols-[80px_2fr_1fr_1fr] p-4 items-center border-b border-[#DBE1E7]
                  ${isCurrentUser ? "bg-purple-600 text-white" : "hover:bg-gray-50"}`}
              >
                <div className="w-[80px] flex justify-center">
                  {rank === 1 ? (
                    <FirstPlaceIcon className="w-8 h-8" />
                  ) : rank === 2 ? (
                    <SecondPlaceIcon className="w-8 h-8" />
                  ) : rank === 3 ? (
                    <ThirdPlaceIcon className="w-8 h-8" />
                  ) : (
                    <span className="w-8 h-8 flex items-center justify-center"><b>{rank}</b></span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={session.user.image || ""}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span><b>theJohnKennedy</b></span>
                </div>
                <div className="text-center">120</div>
                <div className="text-right">
                  <span className={isCurrentUser ? "text-white" : "text-[#DAA520]"}>1,200</span>
                  <span className={`text-sm ml-1 ${isCurrentUser ? "text-white" : "text-[#DAA520]"}`}>pts</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
