import PropTypes from 'prop-types';

import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { PostShape } from '../prop-shapes/post';
import { fetchPosts } from '../prisma/helpers/post';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Journal = ({ posts }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const router = useRouter();

  const submitForm = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setSubmitting(true);
    setError('');

    try {
      // TODO validate form
      await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
      });

      // Refreshes post list
      router.replace(router.asPath);
      setSuccess(true);
      setTitle('');
      setContent('');
      setSubmitting(false);
    } catch (e) {
      setError('Unable to create post.');
      setSubmitting(false);
    }
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </div>

        {success && <div role="alert">Post created successfully!</div>}
        {error && <div role="alert">{error}</div>}
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
