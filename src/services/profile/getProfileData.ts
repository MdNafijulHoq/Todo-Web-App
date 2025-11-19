"use server";

import { baseAPI } from "@/lib/api";
import { GetToken } from "@/utils/getToken";

export const getProfileData = async () => {
  try {
    const token = await GetToken();

    const response = await fetch(`${baseAPI}/api/users/me/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const data = await response.json();
    // console.log({ data });
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
