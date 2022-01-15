import React from "react";
import Link from "next/link";
import { BsCodeSlash } from "react-icons/bs";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  SignOutButton,
  SignInButton,
} from "../Components/SignInAndSignOutBtn/SignInAndSignOutBtn";

const Nav = () => {
  return (
    <nav className="relative w-full  mx-auto ">
      <div className="border-b border-gray-200 py-2 flex items-center justify-between mb-16 sm:mb-20 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className=" flex flex-1 flex-row  py-5 w-full items-center">
          <div className="px-3">
            <Link href="/">
              <a>
                <BsCodeSlash className="text-5xl text-dilate-green" />
              </a>
            </Link>
          </div>
          <div>
            <Link href="/">
              <a className="text-3xl font-montserrat text-white font-bold ">
                DeBLOG
              </a>
            </Link>
            <p className="text-white">Tech Posts and Tutorial everyday</p>
          </div>
        </div>
        <div className=" flex flex-1  py-3 justify-end w-full items-center gap-x-2">
          <SignedIn>
            <Link href="/forms/createFormPost">
              <a className="px-5 py-2 shadow-md   rounded-md   font-bold ">
                New Post
              </a>
            </Link>
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
