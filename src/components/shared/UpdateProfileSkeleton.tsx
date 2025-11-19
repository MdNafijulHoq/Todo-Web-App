"use Client";

const UpdateProfileSkeleton = () => {
  return (
    <div className="mt-5 space-y-6">
      {/* Profile Photo Section Skeleton */}
      <div className="mb-8 border border-gray-200 p-6 rounded-xl">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse"></div>
          </div>
          <div className="w-40 h-10 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Form Fields Skeleton */}
      <div className="space-y-6">
        {/* Name Fields Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            <div className="h-11 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            <div className="h-11 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Bio Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/6 animate-pulse"></div>
          <div className="h-24 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Address & Contact Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
            <div className="h-11 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            <div className="h-11 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Birthday Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/6 animate-pulse"></div>
          <div className="h-11 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex mx-auto place-content-center gap-4 mt-8">
        <div className="w-48 h-10 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-48 h-10 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default UpdateProfileSkeleton;
