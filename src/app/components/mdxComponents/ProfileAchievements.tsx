const Achievements = () => (
    <div className="bg-white rounded-lg border border-[#DBE2E8]">
      <div className="p-6 bg-[#F5F5F5] rounded-t-lg">
        <h2 className="text-xl font-semibold text-[#313233]">Achievements</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              {i < 6 ? (
                <div className="w-16 h-16 bg-purple-100 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-purple-600">🏆</span>
                </div>
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-gray-400">🔒</span>
                </div>
              )}
              <span className="text-sm text-center text-[#5A5A5A] font-normal">Agba Coder</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

export default Achievements;