import React from "react";
import Link from "next/link";
import { BsCodeSlash } from "react-icons/bs";

const Nav = () => {
  return (
    <nav className=" bg-gray-300 mx-auto ">
      <div className="max-w-7xl mx-auto flex flex-row">
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
