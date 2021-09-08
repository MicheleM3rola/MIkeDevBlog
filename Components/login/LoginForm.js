import React from "react";

const LoginForm = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <form className="mt-8  w-1/4 border border-black py-9 flex flex-col gap-5 justify-center items-center rounded-lg shadow-lg">
        <div className="w-full flex flex-col justify-center items-center text-lg  py-6 font-montserrat ">
          {" "}
          Welcome To The Admin Login{" "}
        </div>

        <hr className="border border-t-1 border-blue-400 w-2/3" />
        <div className="w-full flex flex-col justify-center items-center">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-lg p-2 w-2/3 border border-gray-200"
            type="email"
            name="email"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <label htmlFor="password">Password</label>
          <input
            className="rounded-lg p-2 w-2/3 border border-gray-200 "
            type="password"
            name="password"
          />
        </div>
        <button className=" mt-6 p-2 rounded-lg w-1/2 bg-black-100 border  border-black">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
