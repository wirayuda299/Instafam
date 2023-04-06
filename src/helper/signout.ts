import { getCsrfToken, signOut } from "next-auth/react";

export  const handleSignOut = async (session:any) => {
  const url = require('url');
  const callbackUrl = `${process.env.NEXTAUTH_URL}/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F`;
  const parsedUrl = url.parse(callbackUrl, true);
  const getBaseUrl = (urlObj: any) => {
    const { protocol, host, pathname } = urlObj;
    return `${protocol}//${host}${pathname}`;
  };
  const baseUrl = getBaseUrl(parsedUrl);
  try {
    if (session) {
      const csrfToken = await getCsrfToken();
      if (!csrfToken) {
        throw new Error('No CSRF token');
      }

      await signOut({
        callbackUrl: baseUrl,
        redirect: true,
      });
    }
    return null;
  } catch (error: any) {
    console.log(error.message);
  }
};