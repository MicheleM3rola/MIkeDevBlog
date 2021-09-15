import React from "react";
import Editor from "../../Components/CreateEditPost/Editor";

const CreateFormPost = () => {
  return (
    <div className="container grid grid-cols-12 px-2 mx-auto 2xl:grid-cols-10 2xl:px-5 h-screen">
      <div className="col-span-12 xl:col-span-10 xl:col-start-2 2xl:col-start-3 2xl:col-span-6">
        <div className="w-full px-4 pt-5">
          <Editor />
        </div>
        Hello
      </div>
    </div>
  );
};

export default CreateFormPost;
