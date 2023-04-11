import { SessionSchema } from "@/schema/comment";
import { Session } from "next-auth";
import { getCsrfToken, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Url } from "url";
import { z } from 'zod';

const signOutSchema = z.object({
  session: SessionSchema
})
export const handleSignOut = async (session: Session | null) => {
  try {
    const url = require('url');
    const callbackUrl = `${process.env.NEXTAUTH_URL}/auth/signin?callbackUrl=%2F`;
    const parsedUrl = url.parse(callbackUrl, true);
    const getBaseUrl = (urlObj: Url) => {
      const { protocol, host, pathname } = urlObj;
      return `${protocol}//${host}${pathname}`;
    };
    const baseUrl = getBaseUrl(parsedUrl);
    const isValid = signOutSchema.parse({ session });
    if (!isValid) throw new Error('there is no session');
    if (session) {
      const csrfToken = await getCsrfToken();
      if (!csrfToken) {
        throw new Error('No CSRF token');
      }

      await signOut({
        callbackUrl: baseUrl,
        redirect: true,
      }).then(() => {
        toast.success('Signed out successfully');
      });
    }
    return null;
  } catch (error: any) {
    console.log(error.message);
  }
};