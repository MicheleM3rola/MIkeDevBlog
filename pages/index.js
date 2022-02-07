import PostList from "../Components/postList/PostList";
import Categories from "../Components/Sidebar/Categories";
import SideBar from "../Components/Sidebar/SideBar";

import prisma from "../lib/prisma";
export default function Home({ posts }) {
  const resultData = JSON.parse(posts);

  return (
    <div className=" flex flex-row max-w-4xl mx-auto w-full mb-8 gap-3">
      <div className="font-montserrat   relative flex flex-col w-2/3 ">
        <PostList allPost={resultData} />
      </div>

      <div className="font-montserrat relative flex flex-col w-1/3 gap-3 ">
        <SideBar postTitles={resultData} />
        <Categories postCategories={resultData} />
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
