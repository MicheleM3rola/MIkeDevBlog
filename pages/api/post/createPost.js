import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, content, category } = req.body;

  const result = await prisma.post.create({
    include: {
      category: true,
    },
    data: {
      title: title,
      content: content,
      category: {
        create: { name: category },
      },
    },
  });
  res.json(result);
}
