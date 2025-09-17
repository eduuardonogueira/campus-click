"use server";

import { AUTH_COOKIE_KEY } from "@/constants/cookies";
import { LOGIN_ROUTE } from "@/constants/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_KEY);
  redirect(LOGIN_ROUTE);
}

export async function login(
  username: string,
  password: string
): Promise<boolean> {
  if (username === "admin@admin" && password === "admin") {
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_KEY, "admin");
    return true;
  }

  if (username === "user@user" && password === "user") {
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_KEY, "user");
    return true;
  }

  return false;
}

