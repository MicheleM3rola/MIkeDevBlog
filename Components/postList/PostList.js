import React from "react";
import useSWR from "swr";

const PostList = () => {
  const { data: posts, mutate } = useSWR("/api/posts");

  return (
    <div className="col-span-5 font-montserrat ">
      {posts &&
        posts.map((post) => {
          return <p key={post.id}>{post.data.title}</p>;
        })}
    </div>
  );
};

export default PostList;
