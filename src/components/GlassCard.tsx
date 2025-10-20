
import { cn } from '@/lib/utils';
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  isPadded?: boolean;
}

const GlassCard = ({ children, className, isPadded = true }: GlassCardProps) => {
  return (
    <div
      className={cn(
        'glass-card',
        isPadded && 'p-4 sm:p-6',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
