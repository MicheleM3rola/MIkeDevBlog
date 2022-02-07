import React from "react";
import Link from "next/link";

const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

const Categories = ({ postCategories }) => {
  return (
    <div className=" flex flex-col py-4 items-start justify-start z-10 relative border border-black-600  rounded-lg text-white">
      <h1 className=" text-2xl font-bold p-3">Categories</h1>
      <div className="px-3 text-2xl flex flex-row">
        {postCategories.map(({ id, category }) => {
          return (
            <Link href={`/Category/${category.name}`} key={id}>
              <a className="text-lg">
                <span className="text-sm ml-2 border border-red-600 rounded-lg p-1 ">
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

export default Categories;
