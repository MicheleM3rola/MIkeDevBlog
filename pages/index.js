import PostList from "../Components/postList/PostList";
import SideBar from "../Components/Sidebar/SideBar";

export default function Home() {
  return (
    <div className="container grid items-stretch grid-cols-8 gap-2 px-2 mx-auto md:gap-4 xl:grid-cols-8 2xl:px-5 min-h-screen py-3">
      <PostList />

      <div className="font-montserrat  w-full col-span-3 rounded-lg shadow-lg relative">
        <SideBar />
      </div>
    </div>
  );
}
