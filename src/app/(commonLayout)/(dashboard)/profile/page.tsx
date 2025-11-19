import AccountInformation from "@/components/profile/AccountInformation";
import PasswordSection from "@/components/profile/PasswordSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Page || ToDo Web App",
  description: "This is user profile page ",
};

const ProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-8 py-6">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Account Information
          </h1>
          <PasswordSection />
        </div>
        <AccountInformation />
      </div>
    </div>
  );
};

export default ProfilePage;
