import React from "react";
import Editor from "../../Components/CreateEditPost/Editor";
import axios from "axios";
import { useRouter } from "next/router";
import prisma from "../../lib/prisma";

const EditPost = (postToEdit) => {
  // Page to create the post with the editor component

  const router = useRouter();

  const handleOnUpdate = async (title, content, category, id) => {
    try {
      await axios.patch(`/api/updatePost/${id}`, {
        title,
        content,
        category,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnDelete = async (id) => {
    if (window.confirm("Do you really want to delete this post?")) {
      try {
        await axios.delete(`/api/deletePost/${id}`);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container grid grid-cols-12 px-2 mx-auto 2xl:grid-cols-10 2xl:px-5 h-screen">
      <div className="col-span-12 xl:col-span-10 xl:col-start-2 2xl:col-start-3 2xl:col-span-6">
        <div className="w-full px-4 pt-5">
          <Editor
            initialData={postToEdit}
            onUpdate={handleOnUpdate}
            showUpdateButton={true}
            showDeleteButton={true}
            onDelete={handleOnDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default EditPost;

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const postToEdit = await prisma.post.findFirst({
    where: {
      id: {
        equals: Number(id),
      },
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
    props: postToEdit,
  };
};

{
  /*export const getServerSideProps = async ({ params }) => {
  const postToEdit = await prisma.post.findUnique({
    where: {
      id: Number(params?.id),
    },
  });
  return {
    props: postToEdit,
  };
};*/
}
