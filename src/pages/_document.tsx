import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white dark:bg-black" id="modal-root">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
