import React from "react";
import { useClerk } from "@clerk/clerk-react";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  return (
    <button
      className=" px-5 py-2 shadow-md  rounded-md   font-bold text-white"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export const SignInButton = () => {
  const { openSignIn } = useClerk();
  return (
    <button
      className="px-5 py-2 shadow-md   rounded-md   font-bold text-white"
      onClick={() => openSignIn()}
    >
      Sign In
    </button>
  );
};
