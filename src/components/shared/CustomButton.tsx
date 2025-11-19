"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { ICustomBtn } from "@/types/interfaces";

const CustomButtton = ({ word, onClick }: ICustomBtn) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      className="cursor-pointer text-white w-48 bg-[#5272FF] hover:bg-[#21AAE2EE] text-[16px]"
      size="lg"
      onClick={handleClick}
    >
      <Plus className="w-4 h-4" strokeWidth={5} color="white" />
      {word}
    </Button>
  );
};

export default CustomButtton;
