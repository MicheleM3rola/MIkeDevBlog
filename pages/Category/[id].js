import React from "react";
import prisma from "../../lib/prisma";
import PostCard from "../../Components/postCard/PostCard";
import dateFormat from "dateformat";
import { UserHOC } from "../../Components/User/User";

const Category = ({ singleCategory }) => {
  // component to read the actual post by id

  const [postX] = singleCategory;

  return (
    <div className="flex flex-col justify-center align-center  w-9/12 mx-auto">
      <div className="flex  justify-start align-center text-white mb-11 w-6/12 mx-auto pb-8 ">
        <h1 className="text-7xl font-semibold">{postX.category.name}..</h1>
      </div>

      <div className="flex flex-col w-6/12 mx-auto">
        {singleCategory.map(({ title, content, id, createdAt, image }) => {
          const datePost = dateFormat(createdAt, "mmmm dS, yyyy");
          return (
            <PostCard
              title={title}
              content={content}
              image={image}
              key={id}
              date={datePost}
              id={id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;

export const getServerSideProps = async ({ params }) => {
  const singleCategory = await prisma.post.findMany({
    where: {
      category: {
        name: {
          contains: params?.id,
        },
      },
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
    props: { singleCategory },
  };
};

// trying commmit
