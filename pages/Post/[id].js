import React from "react";
import prisma from "../../lib/prisma";
import { UserHOC } from "../../Components/User/User";

const Post = (singlePost) => {
  // component to read the actual post by id

  return (
    <div className="flex flex-col   xl:w-9/12 mx-auto">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-2  text-white">
          {singlePost.title}
          <span className="text-dilate-green text-sm ml-3">
            {singlePost.category.name}
          </span>
        </h1>
        <div className="mt-5 h-96">
          <img src={singlePost.image} className="h-full" alt="post Image" />
        </div>
        <div className="text-white mt-12 w-3/5 ">
          <p>{singlePost.content}</p>
        </div>
        <div className="w-3/5 mt-10 flex flex-row justify-start">
          <UserHOC />
        </div>
      </div>
    </div>
  );
};

export default Post;

export const getServerSideProps = async ({ params }) => {
  const singlePost = await prisma.post.findUnique({
    where: {
      id: Number(params?.id),
    },

    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: singlePost,
  };
};
