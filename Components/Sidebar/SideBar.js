import React from "react";
import Link from "next/link";

const SideBar = ({ postTitles }) => {
  return (
    <div className=" flex flex-col p-1 items-start justify-start z-10 relative ">
      <h1 className=" text-3xl font-bold  p-5">Post List</h1>
      <div className="p-5 text-2xl flex flex-col">
        {postTitles.map(({ title, id }) => {
          return (
            <Link href={`/Post/${id}`} key={id}>
              <a className="">{title}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
