"use server";
import { cookies } from "next/headers";

export const GetToken = async (): Promise<string> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  let token;

  if (accessToken) {
    token = accessToken;
  } else if (refreshToken) {
    token = refreshToken;
  }

  //   console.log({ token });

  if (!token) {
    throw new Error("No token found");
  }

  return token;
};
