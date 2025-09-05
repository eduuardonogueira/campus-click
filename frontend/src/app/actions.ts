"use server";

import { LOGIN_ROUTE } from "@/constants/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("authToken");
  redirect(LOGIN_ROUTE);
}

export async function login(
  username: string,
  password: string
): Promise<boolean> {
  if (username === "admin@admin" && password === "admin") {
    const cookieStore = await cookies();
    cookieStore.set("authToken", "123");
    return true;
  }

  return false;
}

