"use server";

import { baseAPI } from "@/lib/api";
import { IValues } from "@/types/interfaces";
import { GetToken } from "@/utils/getToken";

export const createTodo = async (values: IValues) => {
  try {
    // console.log({ values });
    const newFormData = new FormData();
    newFormData.append("title", values.title);
    newFormData.append("description", values.description);
    newFormData.append("priority", values.priority);
    newFormData.append("todo_date", values.formattedDate);

    const token = await GetToken();

    const response = await fetch(`${baseAPI}/api/todos/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newFormData,
    });
    const result = await response.json();
    // console.log({ result });
    if (!response.ok) {
      if (result.detail) {
        return {
          success: false,
          error: "Format missmatched",
          message: result.detail,
          data: result,
        };
      }
      return {
        success: false,
        error: "Failed to create ToDo",
        message: result.detail || "Failed to create ToDo",
        data: result,
      };
    }

    return {
      success: true,
      data: result,
      message: "ToDo created successfully",
    };
  } catch (error) {
    console.error("Error creating Todo:", error);
    throw error;
  }
};
