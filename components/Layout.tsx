import { Header } from './Header';
import Head from 'next/head';
import {
  SECONDARY_COLOR,
  BACKGROUND_COLOR,
  CONTENT_WIDTH,
  FONT_COLOR,
  FONT_FAMILY,
  BORDER_COLOR,
} from '../lib/styles';

export function Layout({ children }: React.PropsWithChildren<{}>): JSX.Element {
  return (
    <>
      <Head>
        <title>Hello Thinkific</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <div className="layout">{children}</div>
      <style jsx global>{`
        body {
          margin: 0;
          font-size: 16px;
          background-color: ${BACKGROUND_COLOR};
          font-family: ${FONT_FAMILY};
          color: ${FONT_COLOR};
        }

        html {
          box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        button {
          padding: 15px;
          background-color: ${SECONDARY_COLOR};
          color: ${FONT_COLOR};
          font-size: 16px;
          border: none;
          border-radius: 5px;
          font-weight: 700;
          font-family: ${FONT_FAMILY};
        }

        input,
        textarea {
          border: 1px solid ${BORDER_COLOR};
          border-radius: 5px;
          padding: 10px;
          font-size: 16px;
          font-family: ${FONT_FAMILY};
        }
      `}</style>
      <style jsx>{`
        .layout {
          padding: 0 2rem;
          max-width: ${CONTENT_WIDTH};
          margin: 0 auto;
        }
      `}</style>
    </>
  );
}
