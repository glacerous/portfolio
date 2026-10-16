import React, { useEffect, useState } from 'react';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  total: {
    [year: string]: number;
    lastYear: number;
  };
  contributions: ContributionDay[];
}

export const ActivityGraph: React.FC<{ username: string }> = ({ username }) => {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [totalCount, setTotalCount] = useState<number>(512);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(res => res.json())
      .then((res: ApiResponse) => {
        if (!active) return;
        if (res && res.contributions && res.contributions.length > 0) {
          setData(res.contributions);
          if (res.total?.lastYear) {
            setTotalCount(res.total.lastYear);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [username]);

  // If loading or empty, generate a fallback grid matching GitHub format
  const displayDays = data.length > 0 ? data : Array.from({ length: 364 }, (_, i) => ({
    date: `2026-01-${(i % 30) + 1}`,
    count: (i % 7 === 1 || i % 5 === 0) ? (i % 4) + 1 : 0,
    level: (i % 7 === 1 || i % 5 === 0) ? Math.min(4, (i % 4) + 1) : 0
  }));

  // Group by weeks (each column has 7 days)
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < displayDays.length; i += 7) {
    weeks.push(displayDays.slice(i, i + 7));
  }

  // Month labels
  const months = ['OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'];

  const getCellFill = (level: number) => {
    switch (level) {
      case 1: return '#9be9a8';
      case 2: return '#40c463';
      case 3: return '#30a14e';
      case 4: return '#216e39';
      default: return '#ebedf0';
    }
  };

  return (
    <div className="w-full select-none">
      <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="min-w-[670px] w-full">
          <svg className="block w-full h-auto font-mono text-[10px]" viewBox="0 0 686.5 108.5">
            {/* Month labels */}
            <g className="fill-[#8A8A8A] text-[10px] font-mono tracking-wider">
              {months.map((m, idx) => (
                <text key={m} dominantBaseline="hanging" x={idx * 55} y={0} className="select-none">
                  {m}
                </text>
              ))}
            </g>

            {/* Contribution Cells */}
            <g transform="translate(0, 16)">
              {weeks.map((week, wIdx) => (
                <g key={wIdx} transform={`translate(${wIdx * 13}, 0)`}>
                  {week.map((day, dIdx) => (
                    <rect
                      key={dIdx}
                      x={0}
                      y={dIdx * 13}
                      width={10.5}
                      height={10.5}
                      rx={2}
                      ry={2}
                      fill={getCellFill(day.level)}
                      className="transition-colors duration-150 hover:opacity-80 cursor-pointer"
                    >
                      <title>{`${day.count} contributions on ${day.date}`}</title>
                    </rect>
                  ))}
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* Footer stats */}
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11.5px] tracking-wide text-[#8A8A8A] select-none mt-2">
        <div className="uppercase tracking-wider">
          <span className="font-semibold text-[#0A0A0A]">{totalCount}</span> CONTRIBUTIONS · 2025–26
        </div>
        <div className="ml-auto flex items-center gap-1.5 uppercase tracking-wider">
          <span className="text-[#8A8A8A] text-[11px]">LESS</span>
          <div className="flex items-center gap-[2.5px]">
            {[0, 1, 2, 3, 4].map(lvl => (
              <span 
                key={lvl} 
                className="w-[10.5px] h-[10.5px] rounded-[2px]" 
                style={{ backgroundColor: getCellFill(lvl) }}
              />
            ))}
          </div>
          <span className="text-[#8A8A8A] text-[11px]">MORE</span>
        </div>
      </div>
    </div>
  );
};
