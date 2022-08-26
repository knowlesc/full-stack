import { useState } from 'react';
import { useRouter } from 'next/router';

export function Form(): JSX.Element {
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
    <section>
      <style jsx>{`
        section {
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          padding: 20px;
          margin-bottom: 20px;
          background-color: #fff;
          border-radius: 10px;
        }

        .field {
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .field > label {
          display: block;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .field > input,
        .field > textarea {
          width: 100%;
        }
      `}</style>

      <h1>New Post</h1>

      {/* TODO form should be in its own component */}
      <form onSubmit={submitForm}>
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
            Create New Post
          </button>
        </div>

        {success && <div role="alert">Post created successfully!</div>}
        {error && <div role="alert">{error}</div>}
      </form>
    </section>
  );
}
