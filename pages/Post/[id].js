import React from "react";
import prisma from "../../lib/prisma";

const Post = (singlePost) => {
  // component to read the actual bost by id

  return <div></div>;
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

{
  /*export async function getStaticPaths() {
  const dataPaths = await prisma.post.findMany();
  const paths = dataPaths.map((post) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const data = await prisma.post.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    const singlePost = JSON.stringify(data);

    return {
      props: { singlePost }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
*/
}
