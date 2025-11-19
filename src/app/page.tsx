import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // Redirect based on authentication status
  if (accessToken) {
    redirect("/profile");
  } else {
    redirect("/login");
  }
}
