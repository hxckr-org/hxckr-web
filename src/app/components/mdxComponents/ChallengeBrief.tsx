import React from 'react'

const ChallengeBrief = ({title, children}: { title: string, children: React.ReactNode }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="text-lg text-blue-400 text-center">{children}</div>
    </div>
  )
}

export default ChallengeBrief