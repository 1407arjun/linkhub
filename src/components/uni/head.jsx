import NextHead from "next/head";
import { useState, useEffect } from "react";

export default function Head(props) {
  const [theme, setTheme] = useState();

  useEffect(() => {
    setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      setTheme(e.matches ? "dark" : "light");
    }); //add cleanup
  }, [theme]);

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{props.title}</title>
      <meta name="description" content={props.desc} />

      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.desc} />
      <meta
        property="og:image"
        content={props.image ? props.image : "https://linkhub.arjunsivaraman.co/assets/banner.jpg"}
      />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@1407Arjun" />
      <meta property="twitter:domain" content="linkhub.arjunsivaraman.co" />
      <meta property="twitter:url" content="https://linkhub.arjunsivaraman.co/" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.desc} />
      <meta name="twitter:image" content="https://linkhub.arjunsivaraman.co/assets/banner.jpg" />

      <link rel="icon" href={theme === "dark" ? "/assets/icon.svg" : "/assets/icon-black.svg"} />
    </NextHead>
  );
}
