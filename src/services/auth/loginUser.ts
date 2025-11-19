/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { baseAPI } from "@/lib/api";
import { loginSchema } from "@/zodValidation/loginValidation";
import { cookies } from "next/headers";
import z from "zod";

export const loginUser = async (
  values: z.infer<typeof loginSchema>
): Promise<any> => {
  try {
    // console.log({ values });

    const newFormData = new FormData();
    newFormData.append("email", values.email);
    newFormData.append("password", values.password);

    // Send to backend API
    const response = await fetch(`${baseAPI}/api/auth/login/`, {
      method: "POST",
      body: newFormData,
    });
    const result = await response.json();
    // console.log({ response, result });

    if (!response.ok) {
      if (result.detail?.includes("No active account found")) {
        return {
          success: false,
          error: "User not found",
          message: result.detail,
          data: result,
        };
      }
      return {
        success: false,
        error: "Login failed",
        message: result.detail || "Login failed",
        data: result,
      };
    }

    //  set cookies if login was successful and tokens are available
    if (result.access) {
      const cookieStore = await cookies();

      cookieStore.set("accessToken", result.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });
      
      if (result.refresh) {
        cookieStore.set("refreshToken", result.refresh, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "development",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days for refresh token
          path: "/",
        });
      }
    }

    return {
      success: true,
      message: "User Login successfully",
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Network Error",
      message: "Login failed due to network error",
    };
  }
};
