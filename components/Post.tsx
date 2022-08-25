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
        .preserve-format {
          white-space: pre-line;
        }
      `}</style>
      <h1>{title}</h1>
      <p>{date}</p>
      <p className="preserve-format">{content}</p>
    </article>
  );
}
