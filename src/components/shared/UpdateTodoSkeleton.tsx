"use client";

const UpdateTodoSkeleton = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 space-y-4 animate-pulse mx-4">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-7 bg-gray-200 rounded w-32"></div>
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
        </div>

        <div className="mt-2 flex flex-col w-full space-y-4">
          {/* Title Field Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-11 bg-gray-200 rounded w-full"></div>
          </div>

          {/* Date Field Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-11 bg-gray-200 rounded w-full"></div>
          </div>

          {/* Priority Selection Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="flex gap-6">
              <div className="h-10 bg-gray-200 rounded w-20"></div>
              <div className="h-10 bg-gray-200 rounded w-24"></div>
              <div className="h-10 bg-gray-200 rounded w-16"></div>
            </div>
          </div>

          {/* Description Field Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
          </div>

          {/* Checkbox Skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Buttons Skeleton */}
          <div className="mt-5 flex justify-between gap-x-3">
            <div className="h-11 bg-gray-200 rounded w-36"></div>
            <div className="h-11 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodoSkeleton;
