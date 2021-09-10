import React from "react";
import { FaClipboardList } from "react-icons/fa";
const SideBar = () => {
  return (
    <div className=" flex p-4 items-center justify-start z-10 relative ">
      <FaClipboardList className="text-2xl text-purple-600" />
      <h1 className=" text-3xl font-bold ml-2 ">Post List</h1>
    </div>
  );
};

export default SideBar;
