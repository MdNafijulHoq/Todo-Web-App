"use server";

import { baseAPI } from "@/lib/api";
import { GetToken } from "@/utils/getToken";

export const getTodo = async (searchText?: string) => {
  try {
    const token = await GetToken();
    // console.log({ token });
    
    const url = searchText
      ? `${baseAPI}/api/todos/?search=${searchText}`
      : `${baseAPI}/api/todos`;

    // console.log({ url });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch todo: ${response.status}`);
    }

    const data = await response.json();
    // console.log({ data });
    return data.results;
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw error;
  }
};
