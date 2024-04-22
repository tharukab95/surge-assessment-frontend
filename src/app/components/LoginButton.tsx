"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const LoginButton = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.accessToken === undefined) {
      return;
    }

    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("accessToken", session?.user.accessToken);
    }
  }, [session?.user.accessToken]);

  return (
    <div>
      {session?.user ? (
        <button
          className="text-red-500 border-2 border-spacing-2 px-4 py-1 border-red-200 hover:bg-red-500 hover:text-white"
          onClick={() => {
            localStorage.removeItem("accessToken");
            signOut();
          }}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="text-blue-600 border-2 border-spacing-2 px-4 py-1 border-blue-400 hover:bg-blue-500 hover:text-white"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default LoginButton;
