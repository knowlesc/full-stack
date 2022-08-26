import Link from 'next/link';
import { useRouter } from 'next/router';

export function Header(): JSX.Element {
  const { pathname } = useRouter();

  const isActive = (path) => pathname === path;

  return (
    <nav>
      <Link href="/">
        <a data-active={isActive('/')}>
          <b>Journal</b>
        </a>
      </Link>
      <style jsx>{`
        nav {
          padding: 2rem;
        }
      `}</style>
    </nav>
  );
}
