import React from "react";
import prisma from "../../lib/prisma";
import { UserHOC } from "../../Components/User/User";

const Post = (singlePost) => {
  // component to read the actual post by id

  return (
    <div className="flex flex-col   xl:w-9/12 mx-auto">
      <div className="w-full flex flex-col items-center">
        <div className=" h-96 w-3/5 object-cover aspect-square">
          <img
            src={singlePost.image}
            className="h-full w-full object-cover aspect-square"
            alt="post Image"
          />
        </div>
        <h1 className="text-6xl font-bold mt-9 w-3/5  text-white">
          {singlePost.title}
          <span className="text-dilate-green text-sm ml-3">
            {singlePost.category.name}
          </span>
        </h1>

        <div className="text-white mt-12 w-3/5 text-lg leading-8 tracking-widest ">
          <p>{singlePost.content}</p>
        </div>
        <div className="w-3/5 mt-10 mb-10 flex flex-row justify-start">
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

// trying commmit
