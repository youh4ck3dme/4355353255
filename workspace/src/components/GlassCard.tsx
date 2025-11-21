
import { cn } from '@/lib/utils';
import React from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-black/20 backdrop-blur-lg shadow-lg shadow-black/20",
        "transition-transform transition-shadow duration-300 hover:shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
