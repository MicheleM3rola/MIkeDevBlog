import React from "react";
import Editor from "../../Components/CreateEditPost/Editor";
import axios from "axios";
import { useRouter } from "next/router";
const CreateFormPost = () => {
  // Page to create the post with the editor component
  const router = useRouter();

  const handleOnPublish = async (title, content, category, image) => {
    try {
      const {
        data: { id },
      } = await axios.post("/api/post/createPost", {
        title,
        content,
        category,
        image,
      });
      router.push(`/Post/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container grid grid-cols-12 px-2 mx-auto 2xl:grid-cols-10 2xl:px-5 h-screen">
      <div className="col-span-12 xl:col-span-10 xl:col-start-2 2xl:col-start-3 2xl:col-span-6">
        <div className="w-full px-4 pt-5">
          <Editor onPublish={handleOnPublish} showPublishButton={true} />
        </div>
      </div>
    </div>
  );
};

export default CreateFormPost;
