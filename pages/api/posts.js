import { getPosts } from "../../utils/Fauna";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405);
  }

  try {
    const posts = await getPosts();
    return res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
}
