import React from "react";
import prisma from "../../lib/prisma";
import { UserHOC } from "../../Components/User/User";

const Post = (singlePost) => {
  // component to read the actual post by id
  console.log(singlePost);
  return (
    <div className="flex flex-col justify-items-center items-start xl:min-h-screen xl:w-9/12 mx-auto">
      <div>
        <h1 className="text-6xl font-bold mb-2">
          {singlePost.title}
          <span className="text-blue-500 text-sm ml-3">
            {singlePost.category.name}
          </span>
        </h1>

        <UserHOC />
        <img src={singlePost.image} alt="post Image" />
      </div>
      <div>
        <p>{singlePost.content}</p>
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
