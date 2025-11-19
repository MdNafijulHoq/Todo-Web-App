"use server";

import { baseAPI } from "@/lib/api";
import { IUpdateValues } from "@/types/interfaces";
import { GetToken } from "@/utils/getToken";

export const updateTodo = async (values: IUpdateValues, id: number) => {
  try {
    // console.log({ values });
    const newFormData = new FormData();
    newFormData.append("title", values.title);
    newFormData.append("description", values.description);
    newFormData.append("priority", values.priority);
    newFormData.append("todo_date", values.formattedDate);
    newFormData.append("is_completed", values.is_completed.toString());

    const token = await GetToken();

    const response = await fetch(`${baseAPI}/api/todos/${id}/`, {
      method: "PATCH",
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
        error: "Failed to update ToDo",
        message: result.detail || "Failed to update ToDo",
        data: result,
      };
    }

    return {
      success: true,
      data: result,
      message: "ToDo Updated successfully",
    };
  } catch (error) {
    console.error("Error updating Todo:", error);
    throw error;
  }
};
