import React from 'react';

interface AnimatedGeometricBackgroundProps {
  className?: string;
}

export const AnimatedGeometricBackground: React.FC<AnimatedGeometricBackgroundProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden bg-neutral-bg ${className}`}>
      <div className="absolute inset-0 bg-gradient-animation"></div>
      <div className="absolute inset-0 bg-geometric-pattern opacity-10"></div>
    </div>
  );
}; 