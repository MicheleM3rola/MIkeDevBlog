import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, content, category, image } = req.body;

  const result = await prisma.post.create({
    include: {
      category: true,
    },
    data: {
      title: title,
      content: content,
      image: image,
      category: {
        connectOrCreate: {
          create: { name: category },
          where: {
            name: category,
          },
        },
      },
    },
  });
  res.json(result);
}
