import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const postId = req.query.id;
  const { title, content, category, image } = req.body;
  const post = await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      title,
      content,
      image,
      category: {
        update: { name: category },
      },
    },
  });
  res.json(post);
}
