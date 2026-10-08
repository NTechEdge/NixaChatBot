import React, { useMemo } from 'react'

interface HeroGreetingProps {
  userName?: string
}

export const HeroGreeting: React.FC<HeroGreetingProps> = ({ userName = 'Eistiak' }) => {
  const timeOfDay = useMemo(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'Morning'
    if (hour >= 12 && hour < 17) return 'Afternoon'
    return 'Evening'
  }, [])

  return (
    <div className="flex items-center justify-center gap-3 mb-6 select-none animate-in fade-in duration-300">
      {/* Claude Signature Starburst Mark */}
      <span className="text-2xl md:text-3xl text-[#e07a5f] select-none shrink-0" aria-hidden="true">
        ✷
      </span>

      {/* Greeting Title */}
      <h1 className="font-serif text-2xl md:text-3xl lg:text-[34px] font-normal tracking-tight text-zinc-100">
        {timeOfDay}, {userName}
      </h1>
    </div>
  )
}
