/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Camera, Upload } from "lucide-react";
import Image from "next/image";
import LabelWithInput from "@/components/shared/LabelWithInput";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IFormData } from "@/types/interfaces";
import { UpdateProfileInfo } from "@/services/profile/updateProfile";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { getProfileData } from "@/services/profile/getProfileData";
import UpdateProfileSkeleton from "../shared/UpdateProfileSkeleton";
import { useUserStore } from "@/store/userStore";

const AccountInformation = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
  // const [userData, setUserData] = useState<IUserData | null>(null);
  // console.log("userData for user info", userData);

  const [formData, setFormData] = useState<IFormData>({
    firstName: "",
    lastName: "",
    bio: "",
    address: "",
    contactNumber: "",
    birthday: "",
  });

  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        bio: user.bio || "",
        address: user.address || "",
        contactNumber: user.contact_number || "",
        birthday: user.birthday || "",
      });

      if (user.birthday) {
        setDate(new Date(user.birthday));
      }
      if (user.profile_image) {
        setImagePreview(user.profile_image);
      }
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // console.log({ file });

    if (file) {
      setProfileImage(file);
      // Create preview URL for display
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);

    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      setFormData((prev) => ({
        ...prev,
        birthday: formattedDate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        birthday: "",
      }));
    }

    setOpen(false);
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        setIsInitialLoading(true);
        const data = await getProfileData();
        // console.log({ data });
        setUser(data);
        // setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    }

    fetchUserData();
  }, [setUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Updating user information...");
    try {
      const result = await UpdateProfileInfo(formData, profileImage);
      // console.log("result from client", result);

      if (result.success) {
        toast.success(result.message, { id: toastId });
        const updatedData = await getProfileData();
        // setUserData(updatedData);
        setUser(updatedData);
      } else if (result.error === "Format missmatched") {
        toast.error(result.message, { id: toastId });
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (error: any) {
      console.log({ error });
      toast.error(error.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitialLoading) return <UpdateProfileSkeleton />;
  return (
    <>
      <form onSubmit={handleSubmit} className="mt-5">
        {/* Profile Photo Section */}
        <div className="mb-3 border border-gray-200 p-6 rounded-xl">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-[#9F9F9F] flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    unoptimized={true}
                  />
                ) : (
                  <div className="w-12 h-12 bg-[#9F9F9F] rounded-full" />
                )}
              </div>
              <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <label
                htmlFor="profile-upload"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-[#5272FF] cursor-pointer"
              >
                <Upload className="h-4 w-4" color="white" /> Upload New Photo
              </label>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-2.5  border border-gray-200 p-6 rounded-xl">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabelWithInput
              label="First Name"
              placeHolder="Enter your first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <LabelWithInput
              label="Last Name"
              placeHolder="Enter your last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          {/* Bio */}
          <div className="grid w-full gap-3 mt-4">
            <Label className="font-semibold text-[16px] text-black">Bio</Label>
            <Textarea
              className="px-3.5 py-2.5 bg-white placeholder:text-[#717680] min-h-[88px]"
              placeholder="Write your bio..."
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>

          {/* Address & Contact Number Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabelWithInput
              label="Address"
              placeHolder="Enter your address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <LabelWithInput
              label="Contact Number"
              placeHolder="Enter your contact number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
            />
          </div>

          {/* Birthday */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
              Birthday
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-full h-11 justify-between font-normal cursor-pointer"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <CalendarDays />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={handleDateSelect}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Action Buttons */}
          <div className="flex mx-auto place-content-center gap-4 mt-8">
            <button
              disabled={isLoading}
              type="submit"
              className="w-48 px-6 py-2 bg-[#5272FF] text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
            >
              {isLoading ? "Updating..." : " Save Changes"}
            </button>
            <button
              type="button"
              className="w-48 text-center px-6 py-2 bg-[#8CA3CD] border border-gray-300 text-white hover:text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AccountInformation;
