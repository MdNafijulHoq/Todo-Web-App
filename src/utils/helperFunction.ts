/* eslint-disable @typescript-eslint/no-explicit-any */
export const getPriorityColor = (priority: any) => {
  switch (priority.toLowerCase()) {
    case "extreme":
      return "bg-red-100 text-red-800 border-red-200";
    case "moderate":
      return "bg-green-100 text-green-800 border-green-200";
    case "low":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const formatDate = (dateString: any) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

