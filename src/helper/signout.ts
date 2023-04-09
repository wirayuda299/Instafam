import { SessionSchema } from "@/schema/comment";
import { Session } from "next-auth";
import { getCsrfToken, signOut } from "next-auth/react";
import {z} from 'zod';
const signOutSchema = z.object({
  session: SessionSchema
})
export  const handleSignOut = async (session:Session | null) => {
  const url = require('url');
  const callbackUrl = `${process.env.NEXTAUTH_URL}/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F`;
  const parsedUrl = url.parse(callbackUrl, true);
  const getBaseUrl = (urlObj: any) => {
    const { protocol, host, pathname } = urlObj;
    return `${protocol}//${host}${pathname}`;
  };
  const baseUrl = getBaseUrl(parsedUrl);
  try {
    const isValid = signOutSchema.parse({session});
    if (!isValid) throw new Error('there is no session');
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