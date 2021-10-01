import React from "react";
import PostCard from "../postCard/PostCard";
import dateFormat from "dateformat";
const PostList = ({ allPost }) => {
  return (
    <div className="col-span-5 font-montserrat ">
      {allPost.map(({ title, content, id, createdAt }) => {
        const datePost = dateFormat(createdAt, "mmmm dS, yyyy");
        return (
          <PostCard
            title={title}
            content={content}
            key={id}
            date={datePost}
            id={id}
          />
        );
      })}
    </div>
  );
};

export default PostList;
