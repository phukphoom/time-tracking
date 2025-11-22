import Head from "next/head";
import "../css/tailwind.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Time Tracking</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Time-Tracking" />
        <meta name="keywords" content="Time-Tracking" />
        <meta name="author" content="Phukphoom Taphrae" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
