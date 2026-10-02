'use client';

import SkeletonLoader from './SkeletonLoader';

interface LoadingStateProps {
  showSkeleton?: boolean;
  skeletonCount?: number;
}

export default function LoadingState({ 
  showSkeleton = true, 
  skeletonCount = 5 
}: LoadingStateProps) {
  if (showSkeleton) {
    return <SkeletonLoader count={skeletonCount} />;
  }

  return (
    <div className="loading-state">
      <div className="loading-spinner"></div>
      <p>Searching research...</p>
    </div>
  );
}
