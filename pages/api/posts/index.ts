import { NextApiHandler } from 'next';
import { fetchPosts, createPost } from '../../../prisma/helpers/post';

// GET /api/posts
const handleGET: NextApiHandler = async (req, res) => {
  const posts = await fetchPosts();
  res.json(posts);
};

// POST /api/posts
const handlePOST: NextApiHandler = async (req, res) => {
  const body = JSON.parse(req.body);
  const post = await createPost({
    // TODO validate request body
    title: body.title,
    content: body.content,
  });
  res.status(201).json(post);
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    await handleGET(req, res);
  } else if (req.method === 'POST') {
    await handlePOST(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
};

export default handler;
