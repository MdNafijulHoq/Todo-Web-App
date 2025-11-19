"use client";

import { Bell, Calendar } from "lucide-react";
import Image from "next/image";
import navbarLogo from "@/assets/images/navbarLogo.png";
import { useState } from "react";

export function LayoutNavbar() {
  const [currentDate] = useState<Date>(new Date());

  const formatDate = (date: Date) => {
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return { day, formattedDate };
  };

  const { day, formattedDate } = currentDate
    ? formatDate(currentDate)
    : { day: "", formattedDate: "" };

  return (
    <nav className="bg-white px-20 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Logo and Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <Image
              src={navbarLogo}
              alt="navbarLogo"
              className="w-11 h-11 object-cover"
            />
          </div>
          <div className="text-xl text-black">
            <h1 className="font-bold">DREAMY</h1>
            <p className="font-medium text-gray-700">SOFTWARE</p>
          </div>
        </div>

        {/* Right Side - Icons and Date/Time */}
        <div className="flex items-center gap-6">
          {/* Notification Icon */}
          <button className="p-2 text-gray-600 hover:text-gray-900 bg-[#5272FF] rounded-lg transition-colors cursor-pointer">
            <Bell className="w-5 h-5" color="white" />
          </button>

          {/* Calendar Icon */}
          <button className="p-2 text-gray-600 hover:text-gray-900 bg-[#5272FF] rounded-lg transition-colors cursor-pointer">
            <Calendar className="w-5 h-5" color="white" />
          </button>

          {/* Date and Time - Flex Column */}
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-gray-900">{day}</span>
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
