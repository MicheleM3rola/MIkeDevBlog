import React from "react";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();
  return (
    <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto bg-white">
      <Head>
        <title>Michele Dev Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="keywords"
          content="Blog,Development,Web Developer,Front-End,Back-End,Next.js,Tailwind,FaunaDB Vercel,Servless"
        />
        <meta
          name="description"
          content="Tech Blog platform for personal use related to web development "
        />
        <meta charSet="utf-8" />
      </Head>
      {router.pathname !== "/login/login" ? <Nav /> : null}

      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

// Monsterrat for text
// Abel text titles
