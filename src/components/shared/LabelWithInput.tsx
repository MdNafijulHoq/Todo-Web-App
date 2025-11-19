"use client";

import { LabelWithInputProps } from "@/types/interfaces";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const LabelWithInput = ({
  label,
  placeHolder,
  name,
  value,
  inputClassName = "",
  readOnly = false,
  onChange,
}: LabelWithInputProps) => {
  return (
    <div className="grid gap-2">
      <Label
        htmlFor="sheet-demo-name"
        className="font-semibold text-[16px] text-black"
      >
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        suppressHydrationWarning
        className={`bg-white h-11 px-3.5 py-2.5 border border-[#D5D7DA] placeholder:text-[#717680] rounded-md focus:outline-none focus:ring-2 focus:ring-[#21AAE2]focus:border-transparent focus:bg-white hover:bg-white active:bg-white transition-all duration-200 ${inputClassName}`}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default LabelWithInput;
