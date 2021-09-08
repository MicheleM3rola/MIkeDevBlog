import React from "react";
import Link from "next/link";
import { BsCodeSlash } from "react-icons/bs";

const Nav = () => {
  return (
    <nav className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto">
      <div className="border-b border-gray-200 py-2 flex items-center justify-between mb-16 sm:mb-20 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className=" flex flex-1 flex-row  py-5 w-full items-center">
          <div className="px-3">
            <Link href="/">
              <a>
                <BsCodeSlash className="text-3xl text-blue-600" />
              </a>
            </Link>
          </div>
          <div>
            <Link href="/">
              <a className="text-2xl font-montserrat">Mike Dev Blog</a>
            </Link>
            <p>Tech Posts and Tutorial everyday</p>
          </div>
        </div>
        <div className=" flex flex-1  py-3 justify-end w-full items-center gap-x-2">
          <Link href="/forms/createFormPost">
            <a className="px-3 py-1 border-2 border-blue-600 bg-gray-100  rounded-md   font-bold ">
              New Post
            </a>
          </Link>
          <Link href="/login/login">
            <a className="px-3 font-bold text-blue-500 ">Admin</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
