import { LayoutNavbar } from "@/components/layout/LayoutNavbar";
import { SidebarLayout } from "@/components/layout/SidebarLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Left Sidebar */}
        <SidebarLayout />

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          <LayoutNavbar />
          <div className="flex-1 px-20 py-10 bg-gray-300 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
