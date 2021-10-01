import PostList from "../Components/postList/PostList";
import SideBar from "../Components/Sidebar/SideBar";
import prisma from "../lib/prisma";
export default function Home({ posts }) {
  const resultData = JSON.parse(posts);

  return (
    <div className="container grid items-stretch grid-cols-8 gap-2 px-2 mx-auto md:gap-4 xl:grid-cols-8 2xl:px-5 min-h-screen py-3">
      <PostList allPost={resultData} />

      <div className="font-montserrat  w-full col-span-3 rounded-lg shadow-lg relative">
        <SideBar postTitles={resultData} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await prisma.post.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  const posts = JSON.stringify(data);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}
