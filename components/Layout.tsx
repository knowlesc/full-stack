import { Header } from './Header';
import Head from 'next/head';

export function Layout({ children }: React.PropsWithChildren<{}>): JSX.Element {
  return (
    <>
      <Head>
        <title>Hello Thinkific</title>
      </Head>
      <Header />
      <div className="layout">{children}</div>
      <style jsx global>{`
        body {
          margin: 0;
          font-size: 16px;
          background-color: rgba(99, 99, 99, 0.1);
          font-family: Helvetica, Arial, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol';
        }

        html {
          box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
      `}</style>
      <style jsx>{`
        .layout {
          padding: 0 2rem;
        }
      `}</style>
    </>
  );
}
