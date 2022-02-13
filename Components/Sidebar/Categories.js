import React from "react";
import Link from "next/link";

const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

const Categories = ({ postCategories }) => {
  let categories = [
    ...new Set(postCategories.flatMap(({ category }) => category)),
  ].sort();
  let uniqueCategories = getUnique(categories, "name");

  return (
    <div className=" flex flex-col py-4 items-start justify-start z-10 relative border border-black-600  rounded-lg text-white">
      <h1 className=" text-2xl font-bold p-3">Categories</h1>
      <div className="px-3 text-2xl flex flex-row">
        {uniqueCategories.map((categoryName, id) => {
          return (
            <Link href={`/Category/${categoryName}`} key={id}>
              <a className="text-lg">
                <span className="text-sm ml-2 border border-red-600 rounded-lg p-1 ">
                  {categoryName}
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
