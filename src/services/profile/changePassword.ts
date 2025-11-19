"use server";

import { baseAPI } from "@/lib/api";
import { IChangePassValues } from "@/types/interfaces";
import { GetToken } from "@/utils/getToken";

export const changePassword = async (values: IChangePassValues) => {
  try {
    // console.log({ values });
    const newFormData = new FormData();
    newFormData.append("old_password", values.oldpass);
    newFormData.append("new_password", values.newpass);

    const token = await GetToken();

    const response = await fetch(`${baseAPI}/api/users/change-password/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newFormData,
    });
    const result = await response.json();
    // console.log({ result });
    if (!response.ok) {
      return {
        success: false,
        error: "Failed to change password",
        message: result.detail || "Failed to change password",
        data: result,
      };
    }

    return {
      success: true,
      data: result,
      message: "Password change successfully",
    };
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
