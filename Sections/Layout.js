import React from "react";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className=" bg-dilate-color flex flex-col h-screen">
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
      <div className="flex flex-col justify-center px-8 ">
        <Nav />
      </div>

      <main className="flex flex-col justify-center px-8 bg-dilate-color ">
        {children}
        <Footer />
      </main>
    </div>
  );
}

export default Layout;

// Monsterrat for text
// Abel text titles
