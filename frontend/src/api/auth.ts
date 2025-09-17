"use server";

import { IUser } from "@/types/user";
import { cookies } from "next/headers";
import { authFetch } from "./authFetch.ts";
import { AUTH_COOKIE_KEY } from "@/constants/cookies.ts";
import { useUser } from "@/hooks/useUser.ts";

export async function login(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    });

    if (!response || response.status === 403) return false;

    const data = await response.json();
    const { token } = data;

    if (token) {
      const cookieStore = await cookies();
      cookieStore.set("authToken", token);
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

export async function validate(): Promise<boolean> {
  try {
    const response = await authFetch(
      `${process.env.BACKEND_URL}/auth/validate`,
      {
        method: "GET",
      }
    );

    if (!response || response.status === 403) return false;

    return response.json();
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getProfile(): Promise<IUser | null> {
  // try {
  //   const response = await authFetch(
  //     `${process.env.BACKEND_URL}/auth/profile`,
  //     {
  //       method: "GET",
  //     }
  //   );

  //   if (!response || response.status === 403) return null;

  //   return response.json();
  // } catch (error) {
  //   console.log(error);
  //   return null;
  // }

  const { defaultUser, adminUser } = useUser();
  const cookieStore = await cookies();

  const userRole = cookieStore.get(AUTH_COOKIE_KEY)?.value || "user";

  if (userRole === "user") {
    return defaultUser;
  } else {
    return adminUser;
  }
}

