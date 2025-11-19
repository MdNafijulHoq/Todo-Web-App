"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchField = ({
  saearchText,
  setSearchText,
}: {
  saearchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <div className="rounded-xl">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Input
              value={saearchText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchText(e.target.value)
              }
              className="pr-10 bg-white placeholder:text-[#4B5563]"
              placeholder="Search your task here..."
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
          </div>
          <Button
            onClick={() => setSearchText("")}
            className="w-32 bg-red-600 hover:bg-red-500 cursor-pointer"
          >
            Reset
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchField;
