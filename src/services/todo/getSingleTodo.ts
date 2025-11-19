"use server";

import { baseAPI } from "@/lib/api";
import { GetToken } from "@/utils/getToken";

export const getSingleTodo = async (id: number) => {
  try {
    const token = await GetToken();
   
    const response = await fetch(`${baseAPI}/api/todos/${id}`, {
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
    return data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw error;
  }
};
