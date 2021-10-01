import "tailwindcss/tailwind.css";
import Layout from "../Sections/Layout";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import router, { useRouter } from "next/router";

const publicPages = ["/", "/Post/[id]"];

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider
      navigate={(to) => router.push(to)}
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
    >
      {isPublicPage ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <>
          <SignedIn>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

export default MyApp;
