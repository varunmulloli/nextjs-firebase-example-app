import { colors } from '../src/theme';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />

      <style jsx global>{`
        html {
          margin: 0;
          padding: 0;
          height: 100%;
        }

        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          background: ${colors.background};
          color: ${colors.text};
          font-family: 'Nunito', sans-serif;
        }

      `}</style>
    </>
  );
}