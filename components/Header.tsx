import Link from 'next/link';
import { useRouter } from 'next/router';
import { CONTENT_WIDTH, FONT_COLOR_LIGHT, PRIMARY_COLOR } from '../lib/styles';

export function Header(): JSX.Element {
  const { pathname } = useRouter();

  const isActive = (path) => pathname === path;

  return (
    <nav>
      <style jsx>{`
        nav {
          margin-bottom: 2rem;
          background-color: ${PRIMARY_COLOR};
          color: ${FONT_COLOR_LIGHT};
        }

        .nav-content {
          padding: 2rem;
          max-width: ${CONTENT_WIDTH};
          margin: 0 auto;
        }

        .nav-content > a {
          color: ${FONT_COLOR_LIGHT};
        }
      `}</style>
      <div className="nav-content">
        <Link href="/">
          <a data-active={isActive('/')}>
            <b>Journal</b>
          </a>
        </Link>
      </div>
    </nav>
  );
}
