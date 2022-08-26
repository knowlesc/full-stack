import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { Form } from '../components/Form';
import { fetchPosts } from '../prisma/helpers/post';

type Props = {
  posts: {
    id: number;
    title: string;
    createdAt: string;
    content?: string;
    author: {
      id: number;
      email: string;
      name: string;
    };
  }[];
};

export function Journal({ posts }: Props): JSX.Element {
  return (
    <Layout>
      <Form />
      {posts.map(({ id, title, content, createdAt }) => (
        <Post key={id} title={title} content={content} createdAt={createdAt} />
      ))}
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const posts = await fetchPosts();
  return {
    props: {
      // This is a strange workaround to dates not being serializable
      // See: https://github.com/vercel/next.js/issues/11993
      // I would like to understand this better but it works for now
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};

export default Journal;
