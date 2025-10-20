
'use client';

import { useState } from 'react';
import { locations } from '@/lib/locations';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import GlassCard from './GlassCard';

export const InteractiveMap = () => {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  return (
    <GlassCard>
      <div className="p-4 relative aspect-[4/5] w-full">
        <svg
          viewBox="0 0 400 500"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-label="Mapa západného Slovenska s vyznačenými lokalitami"
        >
          {/* Main Map Shape with Gradient */}
          <defs>
            <radialGradient id="mapGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--primary) / 0.1)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--primary) / 0.05)', stopOpacity: 1 }} />
            </radialGradient>
          </defs>

          {/* Base shape */}
          <path
            d="M200 10C100 10 50 100 50 200S100 490 200 490S350 400 350 200S300 10 200 10Z"
            fill="url(#mapGradient)"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="1"
          />
           {/* Secondary shape for depth */}
           <path
            d="M190 20C110 25 70 110 70 200S120 480 200 480S330 390 330 210S270 15 190 20Z"
            className="fill-current text-background/10"
            transform="rotate(-5, 200, 250)"
          />

          {/* Location Points */}
          <g>
            {locations.map((loc) => {
              const isActive = activeLocation === loc.id;
              const pointContent = (
                <g 
                  onMouseEnter={() => setActiveLocation(loc.id)}
                  onMouseLeave={() => setActiveLocation(null)}
                  className="cursor-pointer group"
                >
                  {/* Pulsing outer circle */}
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r="8"
                    className="fill-current text-primary/80 opacity-75"
                  >
                     <animate
                      attributeName="r"
                      from="8"
                      to="20"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                      />
                      <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                      />
                  </circle>

                  {/* Main static circle */}
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r="6"
                    className={cn(
                      "fill-current text-primary/70 stroke-2 stroke-background transition-all duration-300",
                      "group-hover:text-primary group-hover:r-8"
                    )}
                  />
                  
                  {/* Inner dot */}
                   <circle
                    cx={loc.x}
                    cy={loc.y}
                    r="2"
                    className="fill-current text-foreground"
                  />
                 
                </g>
              );

              return (
                <Link key={loc.id} href={loc.slug ? `/blog/${loc.slug}`: '/lokality'} aria-label={`Článok o lokalite ${loc.name}`}>
                  {pointContent}
                </Link>
              );
            })}
          </g>

            {/* Tooltip Text - rendered last to be on top */}
            {locations.map((loc) => {
                 const isActive = activeLocation === loc.id;
                 return (
                    <text
                        key={`text-${loc.id}`}
                        x={loc.x}
                        y={loc.y - 20}
                        textAnchor="middle"
                        className={cn(
                            "text-sm font-bold fill-current text-foreground pointer-events-none transition-all duration-300",
                            isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                        )}
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}
                    >
                      {loc.name}
                    </text>
                 )
            })}

        </svg>
      </div>
    </GlassCard>
  );
};
