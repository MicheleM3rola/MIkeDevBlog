import React from "react";
import prisma from "../../lib/prisma";
import { UserHOC } from "../../Components/User/User";

const Category = ({ singleCategory }) => {
  // component to read the actual post by id
  console.log(singleCategory);

  return <div className="flex flex-col   xl:w-9/12 mx-auto"></div>;
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
