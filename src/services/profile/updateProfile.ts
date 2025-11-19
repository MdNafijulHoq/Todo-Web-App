"use server";

import { baseAPI } from "@/lib/api";
import { IFormData } from "@/types/interfaces";
import { GetToken } from "@/utils/getToken";

export const UpdateProfileInfo = async (
  formValues: IFormData,
  profileImage: File | null
) => {
  try {
    // console.log({ formValues, profileImage });

    const token = await GetToken();

    const formData = new FormData();
    formData.append("first_name", formValues.firstName);
    formData.append("last_name", formValues.lastName);
    formData.append("bio", formValues.bio);
    formData.append("address", formValues.address);
    formData.append("contact_number", formValues.contactNumber);
    formData.append("birthday", formValues.birthday);

    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    const response = await fetch(`${baseAPI}/api/users/me/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const responseData = await response.json();
    // console.log({ responseData });

    if (!response.ok) {
      if (responseData.detail) {
        return {
          success: false,
          error: "Format missmatched",
          message: responseData.detail,
          data: responseData,
        };
      }
      return {
        success: false,
        error: "Update Profile failed",
        message: responseData.detail || "update profile failed",
        data: responseData,
      };
    }

    return {
      success: true,
      data: responseData,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("UpdateProfileInfo error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      data: null,
    };
  }
};
