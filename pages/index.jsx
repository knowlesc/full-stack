import PropTypes from 'prop-types';

import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { PostShape } from '../prop-shapes/post';
import { fetchPosts } from '../prisma/helpers/post';
import { useState } from 'react';

const Journal = ({ posts }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      // TODO validate form
      await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
      });
    } catch (e) {}
  };

  return (
    <Layout>
      <h1>New Post</h1>

      {/* TODO form should be in its own component */}
      <form onSubmit={submitForm}>
        <style jsx>{`
          .field {
            margin-top: 20px;
            margin-bottom: 20px;
          }

          .field > label {
            display: block;
          }

          .field > input,
          .field > textarea {
            width: 100%;
          }
        `}</style>

        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="field">
          <button type="submit">Submit</button>
        </div>
      </form>

      <h1>Posts</h1>
      {posts.map(({ id, title, content, createdAt }) => (
        <Post key={id} title={title} content={content} createdAt={createdAt} />
      ))}
    </Layout>
  );
};

Journal.propTypes = {
  posts: PropTypes.arrayOf(PostShape).isRequired,
};

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
