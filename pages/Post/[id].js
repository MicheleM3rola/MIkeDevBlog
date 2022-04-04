import React from "react";
import prisma from "../../lib/prisma";
import PostCard from "../../Components/postCard/PostCard";
import dateFormat from "dateformat";
import { UserHOC } from "../../Components/User/User";

const Post = ({ singlePost, posts }) => {
  // component to read the actual post by id

  return (
    <div className="flex flex-col   xl:w-9/12 mx-auto">
      <section className="w-full flex flex-col items-center">
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
      </section>
      <section className="w-full flex flex-col items-center">
        <h1 className="text-6xl text-white mt-9">
          More {singlePost.category.name} posts
        </h1>
        <div className="w-3/5 flex flex-row justify-center items-center mt-12">
          {posts.map(({ category, content, createdAt, image, title, id }) => {
            const datePost = dateFormat(createdAt, "mmmm dS, yyyy");
            return (
              <div key={id}>
                {category.name === singlePost.category.name ? (
                  <PostCard
                    title={title}
                    content={content}
                    image={image}
                    date={datePost}
                    id={id}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
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
  const data = await prisma.post.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    props: { singlePost: singlePost, posts: data },
  };
};
