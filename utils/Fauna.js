const faunaDb = require("faunadb");
const faunaClient = new faunaDb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunaDb.query;

// GET POSTS FROM FAUNA

const getPosts = async () => {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("blog-posts"))),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  );

  const posts = data.map((post) => {
    post.id = post.ref.id;
    delete post.ref;
    return post;
  });

  return posts;
};

// GET SINGLE POST FROM FAUNA

const getSinglePost = async (id) => {};

// CREATE POSTS FROM FAUNA

const createPost = async (title, content, image, author) => {};

// UPDATE POSTS FROM FAUNA

const updatePost = async (id, title, content, image, author) => {};

// DELETE POSTS FROM FAUNA

const deletePost = async (id) => {};

module.exports = {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
