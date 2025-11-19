"use server";

import { baseAPI } from "@/lib/api";
import { GetToken } from "@/utils/getToken";

export const deleteTodo = async (id: number) => {
  try {
    const token = await GetToken();

    await fetch(`${baseAPI}/api/todos/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, message: "Todo deleted successfully" };
  } catch (error) {
    console.error("Error deleting todo:", error);
    return {
      success: false,
      error: "Failed to delete todo",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
