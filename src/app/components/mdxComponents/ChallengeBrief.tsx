import React from 'react'

const ChallengeBrief = ({children}: { children: React.ReactNode }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Challenge Brief</h2>
      <div className="text-lg text-blue-400 text-center">{children}</div>
    </div>
  )
}

export default ChallengeBrief