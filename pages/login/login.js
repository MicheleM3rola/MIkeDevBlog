import React from "react";
import Link from "next/link";
import { BsCodeSlash } from "react-icons/bs";
import LoginForm from "../../Components/login/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen max-w-6x1 mx-auto flex flex-col items-center justify-center">
      <div className="max-w-full flex flex-row mx-auto mb-9">
        <div className="px-3">
          <Link href="/">
            <a>
              <BsCodeSlash className="text-5xl text-blue-600" />
            </a>
          </Link>
        </div>
        <div>
          <Link href="/">
            <a className=" font-bold text-4xl font-montserrat">Mike Dev Blog</a>
          </Link>
        </div>
      </div>
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
