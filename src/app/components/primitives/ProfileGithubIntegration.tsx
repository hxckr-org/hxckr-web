const GitHubIntegration = () => (
    <div className="bg-white rounded-lg border border-[#DBE2E8]">
      <div className="p-6 bg-[#F5F5F5] rounded-t-lg">
        <h2 className="text-xl font-semibold text-[#313233]">GitHub Integration</h2>
      </div>
      <div className="p-6">
        <p className="text-[#5A5A5A] mb-6 font-normal">
          Connect your GitHub account to push your challenges solutions directly to your repositories
        </p>
        <button className="w-full bg-[#7762FF] text-white py-3 rounded-[1000px] hover:bg-[#7762FF]/90 transition-colors font-normal">
          Connect GitHub
        </button>
      </div>
    </div>
  );

export default GitHubIntegration;