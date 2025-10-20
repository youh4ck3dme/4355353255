
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
      <div className="p-4 relative">
        <svg
          viewBox="0 0 400 500"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          aria-label="Mapa západného Slovenska s vyznačenými lokalitami"
        >
          {/* Main Map Shape */}
          <path
            d="M200 10C100 10 50 100 50 200S100 490 200 490S350 400 350 200S300 10 200 10Z"
            className="fill-current text-white/10"
          />
           <path
            d="M190 20C110 25 70 110 70 200S120 480 200 480S330 390 330 210S270 15 190 20Z"
            className="fill-current text-white/5"
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
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r="12"
                    className="fill-current text-brand-bright-green/20"
                  />
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r="8"
                    className={cn(
                      "fill-current text-brand-bright-green/60 transition-all duration-300",
                      "group-hover:text-brand-bright-green"
                    )}
                  />
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r="4"
                    className={cn(
                      "fill-current text-brand-bright-green transition-all duration-300",
                       "group-hover:text-white"
                    )}
                  >
                     <animate
                      attributeName="r"
                      from="4"
                      to="8"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                      />
                      <animate
                      attributeName="opacity"
                      from="1"
                      to="0"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                      />
                  </circle>
                  {isActive && (
                    <text
                      x={loc.x}
                      y={loc.y - 15}
                      textAnchor="middle"
                      className="text-sm font-bold fill-current text-white pointer-events-none"
                    >
                      {loc.name}
                    </text>
                  )}
                </g>
              );

              return loc.slug ? (
                <Link key={loc.id} href={`/blog/${loc.slug}`} aria-label={`Článok o lokalite ${loc.name}`}>
                  {pointContent}
                </Link>
              ) : (
                <g key={loc.id}>
                    {pointContent}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </GlassCard>
  );
};
