import { fetchPosts } from '../../../prisma/helpers/post';

// GET /api/posts
export default async (req, res) => {
  const posts = await fetchPosts();
  res.json(posts);
};
