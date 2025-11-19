"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
};
