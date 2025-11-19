/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { baseAPI } from "@/lib/api";
import { signUpSchema } from "@/zodValidation/signupValidation";
import z from "zod";

export const registerUser = async (
  values: z.infer<typeof signUpSchema>
): Promise<any> => {
  try {
    // console.log({ values });

    const newFormData = new FormData();
    newFormData.append("first_name", values.firstName);
    newFormData.append("last_name", values.lastName);
    newFormData.append("email", values.email);
    newFormData.append("password", values.password);

    // Send to backend API
    const response = await fetch(`${baseAPI}/api/users/signup/`, {
      method: "POST",
      body: newFormData,
    });
    const result = await response.json();
    // console.log({ result });

    if (!response.ok) {
      if (
        result.detail?.includes("already exists") ||
        result.detail?.includes("email")
      ) {
        return {
          success: false,
          error: "User exist",
          message: `User already exists with this email - ${values.email}`,
          data: result,
        };
      }
      return {
        success: false,
        error: "Registration failed",
        message: result.detail || "Registration failed",
        data: result,
      };
    }

    return {
      success: true,
      message: "User created successfully",
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Network Error",
      message: "Registration failed due to network error",
    };
  }
};
