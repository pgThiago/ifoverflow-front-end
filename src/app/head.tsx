"use client";

export default function Head() {
  const isBrowser =
    typeof window !== undefined && typeof window !== "undefined";

  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      {/* allow http */}
      {/* <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      /> */}
      {/* only https */}
      {isBrowser && (
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      )}

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <title>IFoverflow</title>
      <link rel="icon" href="./favicon.ico" type="image/x-icon" />
    </head>
  );
}