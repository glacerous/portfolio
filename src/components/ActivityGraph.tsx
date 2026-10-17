import React, { useEffect, useState, useMemo, useRef } from 'react';

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

interface PropItem {
  type: 'tree' | 'house' | 'pond' | 'flower';
  variant?: 'oak' | 'pine' | 'yellow' | 'white';
  col: number;
  row: number;
  x: number;
  y: number;
  delay: number;
}

export const ActivityGraph: React.FC<{ username: string }> = ({ username }) => {
  const [data, setData] = useState<ContributionDay[]>(() => {
    try {
      const cached = localStorage.getItem(`gh_contrib_${username}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.contributions?.length > 0) return parsed.contributions;
      }
    } catch {}
    return [];
  });
  const [totalCount, setTotalCount] = useState<number>(() => {
    try {
      const cached = localStorage.getItem(`gh_contrib_${username}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.total?.lastYear) return parsed.total.lastYear;
      }
    } catch {}
    return 1504;
  });
  const [isRpg, setIsRpg] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsRpg(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsRpg(false);
    }, 150);
  };

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
          try {
            localStorage.setItem(`gh_contrib_${username}`, JSON.stringify(res));
          } catch {}
        }
      })
      .catch(() => {});
    return () => { active = false; };
  }, [username]);

  // Actual contribution days
  const displayDays = useMemo(() => {
    if (data.length > 0) return data;
    return Array.from({ length: 364 }, (_, i) => ({
      date: `2025-${String(Math.floor(i / 30) + 1).padStart(2, '0')}-${String((i % 30) + 1).padStart(2, '0')}`,
      count: (i % 7 === 1 || i % 5 === 0) ? (i % 4) + 1 : 0,
      level: (i % 7 === 1 || i % 5 === 0) ? Math.min(4, (i % 4) + 1) : 0
    }));
  }, [data]);

  // Group into weeks (7 days per column)
  const weeks: ContributionDay[][] = useMemo(() => {
    const list: ContributionDay[][] = [];
    for (let i = 0; i < displayDays.length; i += 7) {
      list.push(displayDays.slice(i, i + 7));
    }
    return list;
  }, [displayDays]);

  const numWeeks = weeks.length;
  const graphWidth = numWeeks * 13;

  // Month labels matching original clean format
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  // Normal mode colors
  const getNormalCellFill = (level: number) => {
    switch (level) {
      case 1: return '#9be9a8';
      case 2: return '#40c463';
      case 3: return '#30a14e';
      case 4: return '#216e39';
      default: return '#ebedf0';
    }
  };

  // RPG meadow grass colors (checkered variation matching 16-bit reference)
  const getRpgCellFill = (level: number, col: number, row: number) => {
    const isAlt = (col + row) % 2 === 0;
    switch (level) {
      case 1: return isAlt ? '#8bc35c' : '#82bd53';
      case 2: return isAlt ? '#74b93b' : '#6caf32';
      case 3: return isAlt ? '#5fa428' : '#569b1f';
      case 4: return isAlt ? '#4a8d1a' : '#418212';
      default: return '#369dac';
    }
  };

  // Find best land tiles for the Blue Knight & Monster duel in the user's actual data
  const characterPos = useMemo(() => {
    // Search on rows 2, 3, 4 (interior of islands, away from labels)
    for (let col = 18; col < numWeeks - 4; col++) {
      for (let row = 2; row <= 4; row++) {
        const current = weeks[col]?.[row]?.level || 0;
        const next = weeks[col + 1]?.[row]?.level || 0;
        if (current > 0 && next > 0) {
          return { knightCol: col, knightRow: row, monsterCol: col + 1, monsterRow: row, found: true };
        }
      }
    }

    // Fallback: any land tile on rows 2..4
    for (let col = 10; col < numWeeks - 4; col++) {
      for (let row = 2; row <= 4; row++) {
        if ((weeks[col]?.[row]?.level || 0) > 0) {
          return { knightCol: col, knightRow: row, monsterCol: col + 1, monsterRow: row, found: true };
        }
      }
    }

    return { knightCol: 0, knightRow: 0, monsterCol: 0, monsterRow: 0, found: false };
  }, [weeks, numWeeks]);

  // Determine decorations (trees, houses, ponds) on real contribution tiles
  const propsList = useMemo(() => {
    const items: PropItem[] = [];
    let houseCount = 0;
    let pondCount = 0;

    weeks.forEach((week, col) => {
      week.forEach((day, row) => {
        if (day.level === 0) return;

        // Never place props on row 0 or row 6 to preserve clean edges
        if (row === 0) return;

        // Never place props on character duel tiles
        if (
          characterPos.found &&
          ((col === characterPos.knightCol && row === characterPos.knightRow) ||
           (col === characterPos.monsterCol && row === characterPos.monsterRow))
        ) {
          return;
        }

        const x = col * 13;
        const y = 20 + row * 13;
        const delay = Math.round(col * 6.5 + row * 1.1 + 40);
        const hash = (col * 37 + row * 23) % 100;

        // Houses: place a few on high activity clusters
        if (
          day.level >= 2 &&
          hash < 12 &&
          houseCount < 5 &&
          row >= 1 && row <= 3 &&
          !items.some(p => p.type === 'house' && Math.abs(p.col - col) < 6)
        ) {
          items.push({ type: 'house', col, row, x, y, delay });
          houseCount++;
          return;
        }

        // Ponds: place a few in the interior of continents
        if (
          day.level >= 1 &&
          hash > 85 &&
          pondCount < 4 &&
          row >= 2 && row <= 4 &&
          !items.some(p => p.type === 'pond' && Math.abs(p.col - col) < 8)
        ) {
          items.push({ type: 'pond', col, row, x, y, delay });
          pondCount++;
          return;
        }

        // Trees: based on real contribution density with natural breathing room
        // Do not place trees on southern cliff edges so trees are never right on the edge
        const southIsWater = row === 6 || (weeks[col]?.[row + 1]?.level || 0) === 0;
        const isClustered = items.some(p => p.type === 'tree' && Math.abs(p.col - col) <= 1 && Math.abs(p.row - row) <= 1);
        const isNearHouseOrPond = items.some(p => (p.type === 'house' || p.type === 'pond') && Math.abs(p.col - col) <= 1 && Math.abs(p.row - row) <= 1);

        const shouldTree = !southIsWater && !isClustered && !isNearHouseOrPond && (
          (day.level >= 3 && hash < 65) ||
          (day.level === 2 && hash < 45) ||
          (day.level === 1 && hash < 25)
        );

        if (shouldTree) {
          const variant = (col + row) % 3 === 0 ? 'pine' : 'oak';
          items.push({ type: 'tree', variant, col, row, x, y, delay });
          return;
        }

        // Wildflowers on open meadow tiles
        if (day.level >= 1 && hash % 5 === 0) {
          const variant = hash % 2 === 0 ? 'yellow' : 'white';
          items.push({ type: 'flower', variant, col, row, x, y, delay });
        }
      });
    });

    return items;
  }, [weeks, characterPos]);

  // Pre-calculate all static cell data to eliminate render overhead and avoid lag
  const gridCells = useMemo(() => {
    return weeks.flatMap((week, wIdx) => {
      const colX = wIdx * 13;
      return week.map((day, dIdx) => {
        const rowY = 20 + dIdx * 13;
        const hasContributions = day.level > 0;
        const northIsWater = dIdx === 0 || (week[dIdx - 1]?.level === 0);
        const southIsWater = dIdx === 6 || (week[dIdx + 1]?.level === 0);
        const westIsWater = wIdx === 0 || (weeks[wIdx - 1]?.[dIdx]?.level === 0);
        const eastIsWater = wIdx === numWeeks - 1 || (weeks[wIdx + 1]?.[dIdx]?.level === 0);

        const normalFill = getNormalCellFill(day.level);
        const rpgFill = hasContributions ? getRpgCellFill(day.level, wIdx, dIdx) : 'transparent';
        const delay = Math.round(wIdx * 6.5 + dIdx * 1.1);

        return {
          key: `${wIdx}-${dIdx}`,
          colX,
          rowY,
          level: day.level,
          count: day.count,
          date: day.date,
          hasContributions,
          northIsWater,
          southIsWater,
          westIsWater,
          eastIsWater,
          normalFill,
          rpgFill,
          delay
        };
      });
    });
  }, [weeks, numWeeks]);

  // Find calm open water tile for the retro sailboat
  const boatPos = useMemo(() => {
    for (let c = 3; c < 8; c++) {
      if ((weeks[c]?.[1]?.level || 0) === 0 && (weeks[c]?.[2]?.level || 0) === 0) {
        return { x: c * 13 + 1, y: 20 + 2 * 13 + 2, found: true };
      }
    }
    return { x: 42, y: 46, found: true };
  }, [weeks]);

  // Pre-calculate rich multi-tone wave ripples, sparkles, and shore foams
  const waterEffects = useMemo(() => {
    const ripples: { x: number; y: number; width: number; className: string }[] = [];
    const sparkles: { x: number; y: number; className: string }[] = [];
    const shoreFoams: { x: number; y: number; width: number; className: string }[] = [];

    weeks.forEach((week, col) => {
      week.forEach((day, row) => {
        if (day.level === 0) {
          const hash = (col * 47 + row * 19) % 100;
          
          // 3-tone layered wave crest ripples
          if (hash < 18) {
            const phase = hash % 3;
            const className = phase === 0 ? 'rpg-wave-1' : phase === 1 ? 'rpg-wave-2' : 'rpg-wave-3';
            ripples.push({
              x: col * 13 + (hash % 3),
              y: 20 + row * 13 + 5,
              width: hash % 2 === 0 ? 6 : 8,
              className,
            });
          }

          // 4-pixel star glints on ocean water
          if (hash > 80 && hash < 92) {
            sparkles.push({
              x: col * 13 + 4,
              y: 20 + row * 13 + 4,
              className: hash % 2 === 0 ? 'rpg-glint-1' : 'rpg-glint-2',
            });
          }

          // Shoreline surf where water borders a land tile to its south or east
          const southIsLand = row < 6 && (week[row + 1]?.level || 0) > 0;
          const eastIsLand = col < numWeeks - 1 && (weeks[col + 1]?.[row]?.level || 0) > 0;
          if (southIsLand) {
            shoreFoams.push({
              x: col * 13,
              y: 20 + row * 13 + 11,
              width: 13,
              className: (col + row) % 2 === 0 ? 'rpg-wave-1' : 'rpg-wave-2'
            });
          } else if (eastIsLand) {
            shoreFoams.push({
              x: col * 13 + 9,
              y: 20 + row * 13 + 2,
              width: 4,
              className: 'rpg-wave-3'
            });
          }
        }
      });
    });
    return { ripples, sparkles, shoreFoams };
  }, [weeks, numWeeks]);

  return (
    <div className="w-full select-none">
      <div className="w-full overflow-x-auto sm:overflow-x-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div 
          id="activity-graph-wrapper"
          className="min-w-[670px] sm:min-w-0 w-full relative cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsRpg(prev => !prev)}
          title="Hover to explore RPG world"
        >
          <svg 
            className="block w-full h-auto font-mono text-[10px]" 
            viewBox={`0 0 ${graphWidth} 118`}
          >
            <defs>
              {/* Rich 16-bit tropical ocean gradient */}
              <linearGradient id="rpgOceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#30a4b5" />
                <stop offset="45%" stopColor="#24879a" />
                <stop offset="100%" stopColor="#186374" />
              </linearGradient>
            </defs>

            <style>{`
              @keyframes rpgWaveDrift1 {
                0%, 100% { transform: translateX(0px); opacity: 0.55; }
                50% { transform: translateX(2.5px); opacity: 1; }
              }
              @keyframes rpgWaveDrift2 {
                0%, 100% { transform: translateX(0px); opacity: 0.95; }
                50% { transform: translateX(-2px); opacity: 0.5; }
              }
              @keyframes rpgWaveDrift3 {
                0%, 100% { transform: translateX(0px); opacity: 0.6; }
                50% { transform: translateX(2px); opacity: 0.95; }
              }
              @keyframes rpgGlint1 {
                0%, 100% { opacity: 0.15; transform: scale(0.85); }
                50% { opacity: 1; transform: scale(1.1); }
              }
              @keyframes rpgGlint2 {
                0%, 100% { opacity: 0.95; transform: scale(1.05); }
                50% { opacity: 0.1; transform: scale(0.75); }
              }
              @keyframes rpgCharBob {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-0.8px); }
              }
              @keyframes rpgBeamFlicker {
                0%, 100% { opacity: 0.75; }
                50% { opacity: 1; }
              }
              @keyframes rpgSmokeDrift {
                0% { transform: translateY(0px); opacity: 0.85; }
                100% { transform: translateY(-2.5px); opacity: 0; }
              }
              @keyframes rpgBoatDrift {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-1.2px) rotate(2deg); }
              }
              .rpg-wave-1 { animation: rpgWaveDrift1 2.8s ease-in-out infinite; }
              .rpg-wave-2 { animation: rpgWaveDrift2 3.4s ease-in-out infinite 0.7s; }
              .rpg-wave-3 { animation: rpgWaveDrift3 4.0s ease-in-out infinite 1.4s; }
              .rpg-glint-1 { animation: rpgGlint1 2.2s ease-in-out infinite; }
              .rpg-glint-2 { animation: rpgGlint2 2.8s ease-in-out infinite 1.1s; }
              .rpg-knight-bob { animation: rpgCharBob 1.8s ease-in-out infinite; }
              .rpg-monster-bob { animation: rpgCharBob 2.0s ease-in-out infinite 0.3s; }
              .rpg-beam { animation: rpgBeamFlicker 0.9s ease-in-out infinite; }
              .rpg-smoke { animation: rpgSmokeDrift 1.8s ease-out infinite; }
              .rpg-boat { animation: rpgBoatDrift 3.2s ease-in-out infinite; }
              
              /* Hardware-accelerated CSS tile transition with zero overhead */
              .rpg-cell-node {
                transition: fill 0.3s ease-out var(--d, 0ms), opacity 0.25s ease-out var(--d, 0ms), width 0.3s cubic-bezier(0.34, 1.25, 0.64, 1) var(--d, 0ms), height 0.3s cubic-bezier(0.34, 1.25, 0.64, 1) var(--d, 0ms), x 0.3s cubic-bezier(0.34, 1.25, 0.64, 1) var(--d, 0ms), y 0.3s cubic-bezier(0.34, 1.25, 0.64, 1) var(--d, 0ms), rx 0.2s ease-out var(--d, 0ms);
                will-change: fill, opacity;
              }
            `}</style>

            {/* Month labels at top - clean, untouched */}
            <g className="fill-[#8A8A8A] text-[10px] font-mono tracking-wider">
              {months.map((m, idx) => (
                <text 
                  key={`${m}-${idx}`} 
                  dominantBaseline="hanging" 
                  x={Math.min(graphWidth - 25, idx * (graphWidth / (months.length - 1)))} 
                  y={2} 
                  className="select-none"
                >
                  {m}
                </text>
              ))}
            </g>

            {/* Ocean Banner Background (smoothly transitions into animated teal RPG sea) */}
            <rect
              x="0"
              y="20"
              width={graphWidth}
              height="91"
              rx="8"
              ry="8"
              fill={isRpg ? 'url(#rpgOceanGrad)' : 'transparent'}
              stroke={isRpg ? '#1a6475' : 'transparent'}
              strokeWidth="1.2"
              style={{
                transition: 'fill 0.35s ease-out, stroke 0.35s ease-out'
              }}
            />

            {/* Subtle horizontal deep-water current shelf bands for ocean depth */}
            <g 
              style={{ 
                opacity: isRpg ? 1 : 0, 
                transition: 'opacity 0.35s ease-out',
                pointerEvents: 'none'
              }}
              shapeRendering="crispEdges"
            >
              <line x1="8" y1="42" x2={graphWidth - 8} y2="42" stroke="#1d6d80" strokeWidth="1" strokeDasharray="16 28" opacity="0.6" />
              <line x1="16" y1="68" x2={graphWidth - 16} y2="68" stroke="#175b6c" strokeWidth="1" strokeDasharray="24 32" opacity="0.6" />
              <line x1="4" y1="94" x2={graphWidth - 4} y2="94" stroke="#144f5e" strokeWidth="1" strokeDasharray="12 24" opacity="0.6" />
            </g>

            {/* Ocean Waves, Shoreline Surf & Sparkles with retro drifting animation */}
            <g 
              style={{ 
                opacity: isRpg ? 1 : 0, 
                transition: 'opacity 0.35s ease-out',
                pointerEvents: 'none'
              }}
            >
              {/* Shoreline surf breaking gently along island borders */}
              {waterEffects.shoreFoams.map((foam, idx) => (
                <g key={`foam-${idx}`} transform={`translate(${foam.x}, ${foam.y})`}>
                  <g className={foam.className} shapeRendering="crispEdges">
                    <rect x="0" y="0" width={foam.width} height="1" fill="#cffafe" opacity="0.85" />
                    <rect x="1" y="1" width={foam.width - 2} height="1" fill="#67e8f9" opacity="0.45" />
                  </g>
                </g>
              ))}

              {/* 3-Tone Retro Ocean Ripples */}
              {waterEffects.ripples.map((ripple, idx) => (
                <g key={`ripple-${idx}`} transform={`translate(${ripple.x}, ${ripple.y})`}>
                  <g className={ripple.className} shapeRendering="crispEdges">
                    {/* 1px White Crest Gleam */}
                    <rect x="1" y="0" width={ripple.width - 2} height="1" fill="#ffffff" opacity="0.9" />
                    {/* 1px Midtone Cyan Foam */}
                    <rect x="0" y="1" width={ripple.width} height="1" fill="#7ee7f2" />
                    {/* 1px Deep Under-wave Shadow */}
                    <rect x="1" y="2" width={ripple.width - 2} height="1" fill="#135263" opacity="0.75" />
                  </g>
                </g>
              ))}

              {/* 4-Pixel Retro Star Sparkles */}
              {waterEffects.sparkles.map((sparkle, idx) => (
                <g key={`sparkle-${idx}`} transform={`translate(${sparkle.x}, ${sparkle.y})`}>
                  <g className={sparkle.className} shapeRendering="crispEdges">
                    <rect x="1" y="0" width="1" height="3" fill="#a5f3fc" />
                    <rect x="0" y="1" width="3" height="1" fill="#a5f3fc" />
                    <rect x="1" y="1" width="1" height="1" fill="#ffffff" />
                  </g>
                </g>
              ))}

              {/* Cute 16-bit Sailboat drifting on open waters */}
              {boatPos.found && (
                <g transform={`translate(${boatPos.x}, ${boatPos.y})`}>
                  <g className="rpg-boat" shapeRendering="crispEdges">
                    {/* Water wake froth under hull */}
                    <rect x="-2" y="6" width="3" height="1" fill="#ffffff" opacity="0.75" />
                    <rect x="-4" y="6" width="2" height="1" fill="#a5f3fc" opacity="0.5" />
                    {/* Wooden Hull */}
                    <rect x="0" y="5" width="8" height="2" fill="#78350f" />
                    <rect x="1" y="7" width="6" height="1" fill="#451a03" />
                    {/* Mast */}
                    <rect x="4" y="1" width="1" height="5" fill="#451a03" />
                    {/* White Triangular Sail */}
                    <rect x="5" y="2" width="3" height="3" fill="#f8fafc" />
                    <rect x="5" y="3" width="2" height="1" fill="#e2e8f0" />
                    {/* Blue Flag Pennant */}
                    <rect x="5" y="1" width="2" height="1" fill="#38bdf8" />
                  </g>
                </g>
              )}
            </g>

            {/* INDIVIDUAL NODES: Smooth morphing animation on every cell */}
            <g>
              {gridCells.map((cell) => {
                const cellX = isRpg && cell.hasContributions ? cell.colX : cell.colX + 1.25;
                const cellY = isRpg && cell.hasContributions ? cell.rowY : cell.rowY + 1.25;
                const cellSize = isRpg && cell.hasContributions ? 13 : 10.5;
                const cellRadius = isRpg && cell.hasContributions ? 0 : 2;

                const fill = isRpg 
                  ? cell.rpgFill
                  : cell.normalFill;

                const cellOpacity = isRpg && !cell.hasContributions ? 0 : 1;
                const delayMs = isRpg ? cell.delay : 0;

                return (
                  <g key={cell.key}>
                    {/* Main Tile Node */}
                    <rect
                      x={cellX}
                      y={cellY}
                      width={cellSize}
                      height={cellSize}
                      rx={cellRadius}
                      ry={cellRadius}
                      className="rpg-cell-node"
                      style={{
                        fill,
                        opacity: cellOpacity,
                        ['--d' as any]: `${delayMs}ms`
                      }}
                    >
                      <title>{`${cell.count} contributions on ${cell.date}`}</title>
                    </rect>

                    {/* Coastline Sandy Beach Rims (North, West, East facing water) */}
                    {cell.hasContributions && (cell.northIsWater || cell.westIsWater || cell.eastIsWater) && (
                      <g
                        shapeRendering="crispEdges"
                        style={{
                          opacity: isRpg ? 1 : 0,
                          transition: `opacity 0.25s ease-out ${delayMs}ms`,
                          pointerEvents: 'none'
                        }}
                      >
                        {cell.northIsWater && <rect x={cell.colX} y={cell.rowY} width={13} height={1} fill="#e2edb4" />}
                        {cell.westIsWater && <rect x={cell.colX} y={cell.rowY} width={1} height={13} fill="#d5e49f" />}
                        {cell.eastIsWater && <rect x={cell.colX + 12} y={cell.rowY} width={1} height={13} fill="#c8da91" />}
                      </g>
                    )}

                    {/* Southern Cliff for Island Edges */}
                    {cell.hasContributions && cell.southIsWater && (
                      <g
                        transform={`translate(${cell.colX}, ${cell.rowY + 10})`}
                        shapeRendering="crispEdges"
                        style={{
                          opacity: isRpg ? 1 : 0,
                          transition: `opacity 0.25s ease-out ${delayMs}ms`,
                          pointerEvents: 'none'
                        }}
                      >
                        {/* Top sand rim */}
                        <rect x="0" y="0" width="13" height="1" fill="#d7ba83" />
                        {/* Earth cliff face */}
                        <rect x="0" y="1" width="13" height="2" fill="#7a522f" />
                        {/* Bottom water shadow */}
                        <rect x="0" y="3" width="13" height="1" fill="#4d321c" />
                      </g>
                    )}
                  </g>
                );
              })}
            </g>

            {/* HAND-CRAFTED 16-BIT PIXEL ART PROPS (Trees, Houses, Ponds, Wildflowers) */}
            <g style={{ pointerEvents: 'none' }}>
              {propsList.map((item, idx) => (
                <g
                  key={`${item.type}-${idx}`}
                  style={{
                    opacity: isRpg ? 1 : 0,
                    transform: isRpg ? 'scale(1)' : 'scale(0)',
                    transformOrigin: `${item.x + 6.5}px ${item.y + 6.5}px`,
                    transition: `opacity 0.3s ease-out ${isRpg ? item.delay : 0}ms, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) ${isRpg ? item.delay : 0}ms`
                  }}
                >
                  {/* Oak / Fruit Tree */}
                  {item.type === 'tree' && item.variant === 'oak' && (
                    <g transform={`translate(${item.x + 1}, ${item.y - 2})`} shapeRendering="crispEdges">
                      {/* Cast Ground Shadow under tree */}
                      <rect x="2" y="11" width="7" height="1" fill="#143d12" opacity="0.6" />

                      {/* Tree Trunk & Roots */}
                      <rect x="4" y="7" width="3" height="3" fill="#5e3314" />
                      <rect x="4" y="7" width="1" height="3" fill="#854d20" />
                      <rect x="6" y="7" width="1" height="3" fill="#3c1f09" />
                      <rect x="3" y="10" width="5" height="1" fill="#5e3314" />
                      <rect x="3" y="10" width="1" height="1" fill="#854d20" />
                      <rect x="7" y="10" width="1" height="1" fill="#3c1f09" />

                      {/* Canopy Dark Border & Silhouette */}
                      <rect x="4" y="0" width="3" height="1" fill="#10350d" />
                      <rect x="2" y="1" width="7" height="1" fill="#10350d" />
                      <rect x="1" y="2" width="9" height="1" fill="#10350d" />
                      <rect x="0" y="3" width="11" height="3" fill="#10350d" />
                      <rect x="1" y="6" width="9" height="1" fill="#10350d" />
                      <rect x="1" y="7" width="3" height="1" fill="#10350d" />
                      <rect x="7" y="7" width="3" height="1" fill="#10350d" />

                      {/* Canopy Lush Foliage Base */}
                      <rect x="3" y="1" width="5" height="1" fill="#389e24" />
                      <rect x="2" y="2" width="7" height="4" fill="#389e24" />
                      <rect x="1" y="3" width="9" height="3" fill="#389e24" />
                      <rect x="2" y="6" width="2" height="1" fill="#389e24" />
                      <rect x="7" y="6" width="2" height="1" fill="#389e24" />

                      {/* Top-Left Sunlight Highlights (Rounded Lobes) */}
                      <rect x="4" y="1" width="3" height="1" fill="#9cf059" />
                      <rect x="3" y="2" width="3" height="1" fill="#7ee041" />
                      <rect x="1" y="3" width="3" height="2" fill="#7ee041" />
                      <rect x="2" y="3" width="2" height="1" fill="#9cf059" />
                      <rect x="5" y="3" width="2" height="1" fill="#7ee041" />

                      {/* Bottom-Right Underside Shadows (Lobe Crevices) */}
                      <rect x="7" y="4" width="3" height="2" fill="#1e6114" />
                      <rect x="8" y="3" width="2" height="1" fill="#1e6114" />
                      <rect x="2" y="5" width="7" height="1" fill="#1e6114" />
                      <rect x="2" y="6" width="2" height="1" fill="#1e6114" />
                      <rect x="7" y="6" width="2" height="1" fill="#1e6114" />

                      {/* Red Apples / Berries nestled in leaf clusters */}
                      {idx % 2 === 0 ? (
                        <>
                          <rect x="2" y="4" width="1" height="1" fill="#ef4444" />
                          <rect x="7" y="3" width="1" height="1" fill="#ef4444" />
                        </>
                      ) : (
                        <>
                          <rect x="3" y="3" width="1" height="1" fill="#ef4444" />
                          <rect x="8" y="4" width="1" height="1" fill="#ef4444" />
                          <rect x="5" y="4" width="1" height="1" fill="#fca5a5" />
                        </>
                      )}
                    </g>
                  )}

                  {/* Pine / Conifer Tree */}
                  {item.type === 'tree' && item.variant === 'pine' && (
                    <g transform={`translate(${item.x + 1}, ${item.y - 2})`} shapeRendering="crispEdges">
                      {/* Cast Ground Shadow */}
                      <rect x="2" y="11" width="7" height="1" fill="#143d12" opacity="0.6" />

                      {/* Pine Trunk & Root Base */}
                      <rect x="4" y="9" width="3" height="2" fill="#522b13" />
                      <rect x="4" y="9" width="1" height="2" fill="#783e1b" />
                      <rect x="6" y="9" width="1" height="2" fill="#331707" />
                      <rect x="3" y="10" width="5" height="1" fill="#522b13" />

                      {/* Tier 1 (Top Cone needle tip) */}
                      <rect x="5" y="0" width="1" height="1" fill="#082110" />
                      <rect x="4" y="1" width="3" height="1" fill="#082110" />
                      <rect x="3" y="2" width="5" height="1" fill="#082110" />
                      <rect x="4" y="3" width="3" height="1" fill="#082110" />
                      {/* Tier 1 Highlights */}
                      <rect x="5" y="1" width="1" height="1" fill="#86efac" />
                      <rect x="4" y="2" width="2" height="1" fill="#4ade80" />
                      <rect x="6" y="2" width="1" height="1" fill="#166534" />

                      {/* Tier 2 (Middle Bough) */}
                      <rect x="3" y="4" width="5" height="1" fill="#082110" />
                      <rect x="2" y="5" width="7" height="1" fill="#082110" />
                      <rect x="3" y="6" width="5" height="1" fill="#082110" />
                      {/* Tier 2 Highlights & Shadow */}
                      <rect x="4" y="4" width="2" height="1" fill="#4ade80" />
                      <rect x="3" y="5" width="2" height="1" fill="#22c55e" />
                      <rect x="5" y="5" width="2" height="1" fill="#166534" />
                      <rect x="7" y="5" width="1" height="1" fill="#0f3d1e" />
                      <rect x="4" y="6" width="3" height="1" fill="#0f3d1e" />

                      {/* Tier 3 (Base Bough - widest evergreen tier) */}
                      <rect x="2" y="7" width="7" height="1" fill="#082110" />
                      <rect x="1" y="8" width="9" height="1" fill="#082110" />
                      <rect x="0" y="9" width="11" height="1" fill="#082110" />
                      {/* Tier 3 Highlights & Shadow */}
                      <rect x="3" y="7" width="2" height="1" fill="#22c55e" />
                      <rect x="5" y="7" width="2" height="1" fill="#166534" />
                      <rect x="2" y="8" width="3" height="1" fill="#22c55e" />
                      <rect x="5" y="8" width="3" height="1" fill="#166534" />
                      <rect x="8" y="8" width="1" height="1" fill="#0f3d1e" />
                      <rect x="1" y="9" width="4" height="1" fill="#166534" />
                      <rect x="5" y="9" width="4" height="1" fill="#0f3d1e" />
                    </g>
                  )}

                  {/* Cozy Pixel House with Red Roof & Animated Chimney Smoke */}
                  {item.type === 'house' && (
                    <g transform={`translate(${item.x + 1.5}, ${item.y + 1.5})`} shapeRendering="crispEdges">
                      {/* Chimney */}
                      <rect x="7" y="2" width="2" height="2" fill="#782316" />
                      {/* Animated Chimney Smoke */}
                      <rect x="7" y="0" width="1" height="1" fill="#f1f5f9" className="rpg-smoke" />
                      <rect x="8" y="-1" width="1" height="1" fill="#cbd5e1" className="rpg-smoke" style={{ animationDelay: '0.8s' }} />

                      {/* Red Roof Outline */}
                      <rect x="4" y="1" width="2" height="1" fill="#6e1b10" />
                      <rect x="3" y="2" width="4" height="1" fill="#6e1b10" />
                      <rect x="2" y="3" width="6" height="1" fill="#6e1b10" />
                      <rect x="1" y="4" width="8" height="1" fill="#6e1b10" />
                      <rect x="0" y="5" width="10" height="1" fill="#6e1b10" />

                      {/* Red Roof Body */}
                      <rect x="4" y="2" width="2" height="1" fill="#d94b30" />
                      <rect x="3" y="3" width="4" height="1" fill="#d94b30" />
                      <rect x="2" y="4" width="6" height="1" fill="#d94b30" />
                      <rect x="1" y="5" width="8" height="1" fill="#b91c1c" />

                      {/* Wall */}
                      <rect x="1" y="6" width="8" height="3" fill="#fdf4db" />
                      <rect x="1" y="9" width="8" height="1" fill="#78350f" />

                      {/* Wooden Door */}
                      <rect x="4" y="7" width="2" height="2" fill="#4d240c" />
                      <rect x="5" y="8" width="1" height="1" fill="#f59e0b" />

                      {/* Golden Window */}
                      <rect x="2" y="7" width="1" height="1" fill="#fef08a" />
                    </g>
                  )}

                  {/* Pixel Pond with Water Reflection & Lily Pad */}
                  {item.type === 'pond' && (
                    <g transform={`translate(${item.x + 2.5}, ${item.y + 3.5})`} shapeRendering="crispEdges">
                      {/* Deep Shoreline Rim */}
                      <rect x="1" y="0" width="6" height="4" fill="#195e72" />
                      <rect x="0" y="1" width="8" height="2" fill="#195e72" />
                      {/* Clear Water Surface */}
                      <rect x="1" y="1" width="6" height="2" fill="#38bdf8" />
                      <rect x="2" y="1" width="3" height="1" fill="#e0f2fe" />
                      {/* Lily pad with pink flower */}
                      <rect x="5" y="1" width="2" height="1" fill="#4ade80" />
                      <rect x="5" y="2" width="1" height="1" fill="#f472b6" />
                    </g>
                  )}

                  {/* Wildflower / Daisy */}
                  {item.type === 'flower' && (
                    <g transform={`translate(${item.x + 5}, ${item.y + 6})`} shapeRendering="crispEdges">
                      {item.variant === 'yellow' ? (
                        <>
                          <rect x="1" y="1" width="2" height="2" fill="#fde047" />
                          <rect x="1" y="3" width="1" height="1" fill="#16a34a" />
                        </>
                      ) : (
                        <>
                          <rect x="1" y="1" width="2" height="2" fill="#ffffff" />
                          <rect x="1" y="2" width="1" height="1" fill="#fbbf24" />
                          <rect x="1" y="3" width="1" height="1" fill="#16a34a" />
                        </>
                      )}
                    </g>
                  )}
                </g>
              ))}
            </g>

            {/* PIXEL CHARACTERS (Blue Knight & Monster Duel with Clashing Energy) */}
            {characterPos.found && (
              <g
                style={{
                  opacity: isRpg ? 1 : 0,
                  transform: isRpg ? 'scale(1)' : 'scale(0)',
                  transformOrigin: `${characterPos.knightCol * 13 + 13}px ${20 + characterPos.knightRow * 13 + 6}px`,
                  transition: `opacity 0.35s ease-out ${isRpg ? Math.round(characterPos.knightCol * 6.5 + characterPos.knightRow * 1.1 + 40) : 0}ms, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${isRpg ? Math.round(characterPos.knightCol * 6.5 + characterPos.knightRow * 1.1 + 40) : 0}ms`,
                  pointerEvents: 'none'
                }}
              >
                {/* Blue Knight facing right with silver sword */}
                {/* Outer group handles positioning; inner group handles CSS bob animation without clobbering coordinates */}
                <g transform={`translate(${characterPos.knightCol * 13 - 1}, ${20 + characterPos.knightRow * 13 + 1})`}>
                  <g className="rpg-knight-bob" shapeRendering="crispEdges">
                    {/* Helmet & Gold Plume */}
                    <rect x="3" y="0" width="3" height="1" fill="#facc15" />
                    <rect x="2" y="1" width="5" height="1" fill="#1d4ed8" />
                    <rect x="1" y="2" width="7" height="2" fill="#2563eb" />
                    <rect x="0" y="2" width="2" height="2" fill="#1e40af" />

                    {/* Face & Visor */}
                    <rect x="2" y="3" width="5" height="2" fill="#fed7aa" />
                    <rect x="5" y="3" width="1" height="1" fill="#0f172a" />

                    {/* Blue Armor Body */}
                    <rect x="1" y="5" width="6" height="2" fill="#1d4ed8" />
                    <rect x="2" y="6" width="4" height="1" fill="#f59e0b" />
                    <rect x="1" y="7" width="6" height="1" fill="#1e3a8a" />

                    {/* Feet */}
                    <rect x="2" y="8" width="2" height="2" fill="#0f172a" />
                    <rect x="4" y="8" width="2" height="2" fill="#0f172a" />

                    {/* Hand holding sword */}
                    <rect x="6" y="5" width="2" height="2" fill="#fed7aa" />

                    {/* Sword Crossguard */}
                    <rect x="7" y="4" width="1" height="4" fill="#f59e0b" />
                    {/* Steel Blade */}
                    <rect x="8" y="5" width="6" height="2" fill="#f8fafc" />
                    <rect x="12" y="5" width="2" height="1" fill="#cbd5e1" />

                    {/* Clashing Energy Slash Beam */}
                    <rect x="14" y="5" width="3" height="2" fill="#f43f5e" className="rpg-beam" />
                    <rect x="14" y="6" width="3" height="1" fill="#fb7185" className="rpg-beam" />
                    {/* Impact Spark */}
                    <rect x="16" y="4" width="2" height="3" fill="#38bdf8" className="rpg-beam" />
                  </g>
                </g>

                {/* Monster / Robot facing left */}
                {/* Outer group handles positioning; inner group handles CSS bob animation without clobbering coordinates */}
                <g transform={`translate(${(characterPos.monsterCol * 13) + 3}, ${20 + characterPos.monsterRow * 13 + 1})`}>
                  <g className="rpg-monster-bob" shapeRendering="crispEdges">
                    {/* Antenna */}
                    <rect x="4" y="0" width="1" height="1" fill="#ef4444" />
                    {/* Monitor Chassis Frame */}
                    <rect x="1" y="1" width="7" height="1" fill="#475569" />
                    <rect x="0" y="2" width="9" height="5" fill="#94a3b8" />
                    <rect x="1" y="7" width="7" height="1" fill="#475569" />

                    {/* Monitor Screen */}
                    <rect x="1" y="2" width="7" height="5" fill="#0f172a" />

                    {/* Glowing Cyan Eyes */}
                    <rect x="2" y="4" width="1" height="1" fill="#38bdf8" />
                    <rect x="4" y="4" width="1" height="1" fill="#38bdf8" />

                    {/* Orange Torso */}
                    <rect x="2" y="8" width="5" height="2" fill="#ea580c" />

                    {/* Dark Boots */}
                    <rect x="2" y="10" width="2" height="1" fill="#7c2d12" />
                    <rect x="5" y="10" width="2" height="1" fill="#7c2d12" />
                  </g>
                </g>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Footer stats - completely clean, original format without emojis */}
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
                style={{ backgroundColor: getNormalCellFill(lvl) }}
              />
            ))}
          </div>
          <span className="text-[#8A8A8A] text-[11px]">MORE</span>
        </div>
      </div>
    </div>
  );
};
