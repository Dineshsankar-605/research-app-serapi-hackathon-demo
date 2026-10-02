'use client';

interface SkeletonLoaderProps {
  count?: number;
}

export default function SkeletonLoader({ count = 5 }: SkeletonLoaderProps) {
  return (
    <div className="skeleton-container">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-title"></div>
            <div className="skeleton-subtitle"></div>
          </div>
          <div className="skeleton-body">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line" style={{ width: '80%' }}></div>
          </div>
          <div className="skeleton-footer">
            <div className="skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
