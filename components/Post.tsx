type Props = {
  title: string;
  content: string;
  createdAt: string;
};

export function Post({ title, content, createdAt }: Props): JSX.Element {
  const date = new Date(createdAt).toLocaleString();
  return (
    <article>
      <h1>{title}</h1>
      <p>{date}</p>
      <p>{content}</p>
    </article>
  );
}
