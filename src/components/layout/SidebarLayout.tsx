"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { User, CheckSquare, LogOut } from "lucide-react";
import Image from "next/image";
import userImage from "@/assets/images/userImage.jpeg";
import { logout } from "@/services/auth/logout";
import { useUserStore } from "@/store/userStore";

export function SidebarLayout() {
  const pathname = usePathname();
  const { user } = useUserStore();
  // console.log({ user });

  const menuItems = [
    { href: "/profile", icon: User, label: "Account Information" },
    { href: "/todos", icon: CheckSquare, label: "Todos" },
  ];

  const handleLogout = async () => {
    logout();
    redirect("/login");
  };

  return (
    <div className="w-1/6 bg-[#0D224A] shadow-lg min-h-screen flex flex-col">
      {/* Top Section with App Name/Logo */}
      <div className="p-6 text-center text-white">
        <h1 className="text-2xl font-bold">TaskMaster</h1>
        <p className="text-sm mt-1">Manage your tasks efficiently</p>
      </div>

      {/* User Profile Section */}
      <div className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Image
              src={user?.profile_image || userImage}
              alt="Profile"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover"
              unoptimized={true}
            />
          </div>
          <h3 className="font-semibold text-white text-lg">
            {user ? `${user.first_name} ${user.last_name}` : "John Doe"}
          </h3>
          <p className="text-white text-sm mt-1">
            {user ? `${user?.email}` : "john@example.com"}
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-blue-600"
                      : "text-[#8CA3CD] hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button  */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-[#8CA3CD] hover:bg-red-50 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
