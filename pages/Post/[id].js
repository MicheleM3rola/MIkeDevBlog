import React from "react";
import prisma from "../../lib/prisma";
import { UserHOC } from "../../Components/User/User";

const Post = (singlePost) => {
  // component to read the actual post by id

  return (
    <div className="flex flex-col justify-start items-start  xl:w-9/12 mx-auto">
      <div className="w-full flex flex-col  items-center">
        <h1 className="text-6xl font-bold mb-2  text-white">
          {singlePost.title}
          <span className="text-dilate-green text-sm ml-3">
            {singlePost.category.name}
          </span>
        </h1>

        <img src={singlePost.image} className="mt-5" alt="post Image" />
      </div>
      <div className="text-white ">
        <p>{singlePost.content}</p>
      </div>
      <UserHOC />
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
