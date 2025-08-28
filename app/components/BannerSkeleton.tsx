
import React from "react";

interface BannerImageSkeletonProps {
  height?: string;
}

const BannerSkeleton: React.FC<BannerImageSkeletonProps> = ({
  height = "600px",
}) => {
  return (
    <div
      className="absolute inset-0 bg-base-100-light dark:bg-base-200-dark animate-pulse rounded-2xl"
      style={{ height }}
    ></div>
  );
};

export default BannerSkeleton;
