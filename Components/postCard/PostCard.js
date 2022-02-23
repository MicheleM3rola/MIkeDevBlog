import React from "react";
import Link from "next/link";
import axios from "axios";

import { useRouter } from "next/router";
import { UserHOC } from "../User/User";
import { SignedIn } from "@clerk/nextjs";

const PostCard = ({ title, content, date, id, image }) => {
  const router = useRouter();
  const awsId = image.slice(65, 70);

  const deleteBtn = async (id, aws) => {
    if (window.confirm("Do you really want to delete this post?")) {
      try {
        await axios.delete(`/api/deletePost/${id}`);
        await axios.delete(`/api/awsdeleteimage/${aws}`);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className=" rounded-lg bg-gradient-to-r p-1 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] mb-3">
      <div className="bg-white w-full  py-5 px-4 md:px-5 rounded-lg   ">
        <UserHOC />

        <div className="flex flex-row flex-wrap flex-grow-0">
          <div className="flex-auto w-full pr-0 xl:w-auto xl:flex-1 xl:pr-5">
            <Link href={`/Post/${id}`}>
              <a className="mb-1 text-2xl font-semibold leading-tight tracking-tight text-brand-black dark:text-brand-grey-100">
                {title}
              </a>
            </Link>
            <p className="mb-2 mt-2 text-xs font-medium text-brand-grey-600 dark:text-brand-grey-400">
              {date}
            </p>
            <p className="max-w-full min-w-full mb-2 text-base leading-snug tracking-tight break-words  ">
              {content.slice(0, 90)}...
            </p>
          </div>
          <div className="h-48 w-72 flex justify-center">
            <img src={image} alt="image Post" className="w-full h-full" />
          </div>
        </div>
        <SignedIn>
          <div className="flex flex-row items-center justify-between pt-4">
            <div className="flex flex-row items-center justify-start space-x-2 w-full">
              <Link href={`/editForm/${id}`}>
                <a>Edit</a>
              </Link>
              <button
                onClick={() => {
                  deleteBtn(id, awsId);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default PostCard;
