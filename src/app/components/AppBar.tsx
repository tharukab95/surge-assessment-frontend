"use client";
import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";
import { useSession } from "next-auth/react";

const AppBar = () => {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <>
      <div className="flex px-40 py-2 bg-gray-100 items-center justify-between">
        <Link className="text-gray-800 flex-grow" href={"/"}>
          Home
        </Link>
        <div className="flex justify-end gap-12  items-center mr-8">
          <div className="flex items-center gap-2">
            {session?.user?.username && (
              <img src="user_profile_pic.png" width={35} height={35} />
            )}
            <p className="text-stone-800">{session?.user?.username} </p>
          </div>

          <LoginButton />
        </div>
      </div>
      <div className="border-b-2"></div>
    </>
  );
};

export default AppBar;
