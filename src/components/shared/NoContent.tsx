import noContent from "@/assets/images/noTodo.png";
import Image from "next/image";

const NoContent = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Image
        src={noContent}
        alt="No todos found"
        className="w-64 h-64 object-contain mb-6"
      />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</h3>
    </div>
  );
};

export default NoContent;
