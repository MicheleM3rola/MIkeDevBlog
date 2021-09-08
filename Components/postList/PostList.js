import React from "react";
import useSWR from "swr";
import PostCard from "../postCard/PostCard";

const PostList = () => {
  return (
    <div className="col-span-5 font-montserrat ">
      <PostCard />
    </div>
  );
};

export default PostList;
