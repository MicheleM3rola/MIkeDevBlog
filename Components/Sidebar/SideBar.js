import React from "react";
import Link from "next/link";

const SideBar = ({ postTitles }) => {
  return (
    <div className=" flex flex-col py-4 items-start justify-start z-10 relative border border-black-600  rounded-lg">
      <h1 className=" text-2xl font-bold p-3">Post List</h1>
      <div className="px-3 text-2xl flex flex-col">
        {postTitles.map(({ title, id, category }) => {
          return (
            <Link href={`/Post/${id}`} key={id}>
              <a className="text-lg">
                {title}
                <span className="text-xs ml-2 border border-blue-600 rounded-lg p-1 ">
                  {category.name}
                </span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
