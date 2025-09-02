// components/SkeletonText.tsx
import React from 'react';

interface SkeletonTextProps {
  width?: string;
  height?: string;
  count?: number;
  className?: string;
}

const SkeletonText = ({ width = 'w-full', height = 'h-4', count = 1, className = '' }: SkeletonTextProps) => {
  const lines = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`bg-neutral-800 rounded animate-pulse ${width} ${height} ${i > 0 ? 'mt-2' : ''} ${className}`}
    ></div>
  ));

  return <>{lines}</>;
};

export default SkeletonText;