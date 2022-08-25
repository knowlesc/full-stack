type Props = {
  title: string;
  content: string;
  createdAt: string;
};

export function Post({ title, content, createdAt }: Props): JSX.Element {
  const date = new Date(createdAt).toLocaleString();
  return (
    <article>
      <style jsx>{`
        article {
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          padding: 20px;
          margin-bottom: 20px;
          background-color: #fff;
          border-radius: 10px;
        }

        .preserve-format {
          white-space: pre-line;
        }

        hr {
          border: 1px solid rgba(99, 99, 99, 0.2);
        }
      `}</style>
      <h1>{title}</h1>
      <p>{date}</p>
      <hr />
      <p className="preserve-format">{content}</p>
    </article>
  );
}
