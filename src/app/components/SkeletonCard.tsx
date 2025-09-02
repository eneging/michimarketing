// components/SkeletonCard.tsx
import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        {/* Logo */}
        <div className="w-12 h-12 bg-neutral-800 rounded-lg"></div>
        <div className="flex-1">
          {/* Nombre de la herramienta */}
          <div className="h-6 w-3/4 bg-neutral-800 rounded mb-1"></div>
          {/* Rating */}
          <div className="h-4 w-1/2 bg-neutral-800 rounded"></div>
        </div>
      </div>
      {/* Descripción */}
      <div className="h-4 w-full bg-neutral-800 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-neutral-800 rounded mb-4"></div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <div className="h-6 w-16 bg-neutral-800 rounded-full"></div>
        <div className="h-6 w-12 bg-neutral-800 rounded-full"></div>
        <div className="h-6 w-20 bg-neutral-800 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;