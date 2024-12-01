import { auth } from "@/auth";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const GitHubIntegration = async () => {
  const session = await auth();
  const isConnected = session?.user?.github_username ? true : false;
  return (
    <div className="bg-white rounded-lg border border-[#DBE2E8]">
      <div className="p-6 bg-[#F5F5F5] rounded-t-lg">
        <h2 className="text-xl font-semibold text-[#313233]">
          GitHub Integration
        </h2>
      </div>
      <div className="p-6">
        <p className="text-[#5A5A5A] mb-6 font-normal">
          {isConnected
            ? "Your GitHub account is connected"
            : "Connect your GitHub account to push your challenges solutions directly to your repositories"}
        </p>
        <button
          className={`w-full py-3 rounded-[1000px] transition-colors font-normal ${
            isConnected
              ? "flex items-center justify-center cursor-not-allowed bg-[#EFFBF1] text-green-primary border border-[#CEF3D4]"
              : "bg-[#7762FF] text-white hover:bg-[#7762FF]/90"
          }`}
        >
          {isConnected ? (
            <>
              <CheckCircledIcon className="w-4 h-4 mr-2 text-green-primary" />
              GitHub Connected
            </>
          ) : (
            "Connect GitHub"
          )}
        </button>
      </div>
    </div>
  );
};

export default GitHubIntegration;
