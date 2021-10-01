import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const postId = req.query.id;
  const { title, content, category } = req.body;
  const post = await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      title,
      content,
      category: {
        update: { name: category },
      },
    },
  });
  res.json(post);
}
