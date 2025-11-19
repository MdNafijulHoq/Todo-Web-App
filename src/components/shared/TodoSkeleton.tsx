"use client";

const TodoSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 bg-white flex flex-col h-full animate-pulse"
        >
          {/* Header skeleton */}
          <div className="flex justify-between items-start gap-3 mb-4">
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-300 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-3/5"></div>
            </div>
            <div className="w-20 h-7 bg-gray-300 rounded-full"></div>
          </div>

          {/* Description skeleton */}
          <div className="space-y-2 mb-4 flex-1">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-11/12"></div>
            <div className="h-3 bg-gray-200 rounded w-10/12"></div>
            <div className="h-3 bg-gray-200 rounded w-9/12"></div>
          </div>

          {/* Footer skeleton */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="w-24 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoSkeleton;
