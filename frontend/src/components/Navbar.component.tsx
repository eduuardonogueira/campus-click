"use server";

import { HOME_ROUTE } from "@/constants/routes";
import Link from "next/link";
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { LogoutButton } from "./index";
import { IUser } from "@/types/user";
import { getProfile } from "@/api";

export async function Navbar() {
  const user: IUser | null = await getProfile();

  return (
    <header className="flex justify-between px-9 py-3 items-center border-b-gray-900 border-1">
      <div className="flex items-center gap-2">
        <FaCalendarAlt className="text-2xl" />
        <Link href={HOME_ROUTE} className="text-2xl font-bold">
          Campus Click
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex gap-2">
          <FaUserCircle className="text-5xl" />
          <div className="flex flex-col justify-center align-top">
            <span className="">{user?.fullName}</span>
            <span className="text-sm bg-black py-1 px-4 text-white w-min rounded-2xl">
              {user?.role}
            </span>
          </div>
        </div>

        <nav className="flex gap-8 text-gray-400">
          <LogoutButton />
        </nav>
      </div>
    </header>
  );
}

