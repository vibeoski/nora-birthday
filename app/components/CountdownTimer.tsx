'use client';

import { useEffect, useState } from 'react';

const COUNTDOWN_DATE = new Date('2026-01-11T11:30:00');

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = COUNTDOWN_DATE.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: number) => String(value).padStart(2, '0');

  return (
    <div className="flex gap-4 md:gap-6 justify-center flex-wrap">
      <div className="flex flex-col items-center glass-effect rounded-2xl p-6 md:p-8 shadow-xl min-w-[90px] md:min-w-[110px] card-hover border border-white/20">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 tabular-nums">
          {formatTime(timeLeft.days)}
        </div>
        <div className="text-xs text-slate-600 font-semibold uppercase tracking-widest">Days</div>
      </div>
      <div className="flex flex-col items-center glass-effect rounded-2xl p-6 md:p-8 shadow-xl min-w-[90px] md:min-w-[110px] card-hover border border-white/20">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 tabular-nums">
          {formatTime(timeLeft.hours)}
        </div>
        <div className="text-xs text-slate-600 font-semibold uppercase tracking-widest">Hours</div>
      </div>
      <div className="flex flex-col items-center glass-effect rounded-2xl p-6 md:p-8 shadow-xl min-w-[90px] md:min-w-[110px] card-hover border border-white/20">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 tabular-nums">
          {formatTime(timeLeft.minutes)}
        </div>
        <div className="text-xs text-slate-600 font-semibold uppercase tracking-widest">Minutes</div>
      </div>
      <div className="flex flex-col items-center glass-effect rounded-2xl p-6 md:p-8 shadow-xl min-w-[90px] md:min-w-[110px] card-hover border border-white/20">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 tabular-nums">
          {formatTime(timeLeft.seconds)}
        </div>
        <div className="text-xs text-slate-600 font-semibold uppercase tracking-widest">Seconds</div>
      </div>
    </div>
  );
}
