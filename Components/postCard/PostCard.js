import React from "react";
import Link from "next/link";

const PostCard = () => {
  return (
    <div className="bg-white w-full dark:bg-brand-dark-grey-800 dark:border-brand-grey-800 border-b py-5 px-4 md:px-5">
      <div className="flex flex-row items-center flex-1 mb-5">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-2 rounded-full bg-brand-grey-200 dark:bg-brand-grey-700">
          <img src="" alt="" />
        </div>
        <div className="flex flex-col leading-snug">
          <h3 className="inline-block font-semibold text-brand-grey-800 dark:text-brand-grey-100">
            Michele Merola
          </h3>
        </div>
      </div>
      <div className="flex flex-row flex-wrap flex-grow-0">
        <div className="flex-auto w-full pr-0 xl:w-auto xl:flex-1 xl:pr-5">
          <Link href="">
            <a className="mb-1 text-3xl font-semibold leading-tight tracking-tight text-brand-black dark:text-brand-grey-100">
              My first blog post
            </a>
          </Link>
          <p className="mb-2 text-base font-medium text-brand-grey-600 dark:text-brand-grey-400">
            release date
          </p>
          <p className="max-w-full min-w-full mb-2 text-lg leading-snug tracking-tight break-words text-brand-grey-700 dark:text-brand-grey-400">
            Content
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between pt-4">
        <div className="flex flex-row items-center justify-start space-x-2 w-full">
          <Link href="/forms/createFormPost">
            <a>Edit</a>
          </Link>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
