
"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 85,
  priority = false,
  fill = false,
  sizes = '100vw',
  onLoad,
  onError,
}) => {
  // If fill is true, Next.js requires width/height to be omitted or fill=true
  const imgProps = fill
    ? { fill: true, sizes }
    : { width: width || 800, height: height || 600, sizes };

  return (
    <div className={cn("relative overflow-hidden", !fill && "w-full", className)}>
      <Image
        src={src}
        alt={alt || "India Tour Image"}
        quality={quality}
        priority={priority}
        className={cn(
          "transition-all duration-700",
          fill ? "object-cover" : "w-full h-auto"
        )}
        onLoad={onLoad}
        onError={onError}
        {...imgProps}
      />
    </div>
  );
};

export default OptimizedImage;
