"use client";

import { useState } from 'react';

const ProfileChallenges = () => {
    const [activeTab, setActiveTab] = useState('ongoing');
  
    return (
      <div className="bg-white rounded-lg border border-[#DBE2E8]">
        <div className="p-6 bg-[#F5F5F5] rounded-t-lg">
          <h2 className="text-xl font-semibold text-[#313233]">Challenge</h2>
        </div>
        <div className="p-6">
          <div className="flex gap-6 border-b mb-6">
            <button 
              onClick={() => setActiveTab('ongoing')}
              className={`pb-2 ${
                activeTab === 'ongoing'
                  ? 'text-purple-600 border-b-2 border-purple-600 font-medium'
                  : 'text-[#5A5A5A] font-normal'
              }`}
            >
              Ongoing Challenges
            </button>
            <button 
              onClick={() => setActiveTab('completed')}
              className={`pb-2 ${
                activeTab === 'completed'
                  ? 'text-purple-600 border-b-2 border-purple-600 font-medium'
                  : 'text-[#5A5A5A] font-normal'
              }`}
            >
              Completed Challenges
            </button>
          </div>
          <ul className="space-y-4">
            {activeTab === 'ongoing' ? (
              <>
                <li className="text-[#313233]">Challenge Title</li>
                <li className="text-[#313233]">Challenge Title</li>
                <li className="text-[#313233]">Challenge Title</li>
              </>
            ) : (
              <>
                <li className="text-[#313233]">Completed Challenge Title</li>
                <li className="text-[#313233]">Completed Challenge Title</li>
                <li className="text-[#313233]">Completed Challenge Title</li>
              </>
            )}
          </ul>
          <button className="text-purple-600 mt-6 font-medium">View All</button>
        </div>
      </div>
    );
  };

export default ProfileChallenges;