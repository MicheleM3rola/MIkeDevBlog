import PostList from "../Components/postList/PostList";
export default function Home() {
  return (
    <div className="container grid items-stretch grid-cols-12 gap-2 px-2 mx-auto md:gap-4 xl:grid-cols-8 2xl:px-5 min-h-screen py-3">
      <PostList />
      <div className="col-span-3 font-montserrat">
        <h1 className="text-3xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Side Bar
          </a>
        </h1>
      </div>
    </div>
  );
}
