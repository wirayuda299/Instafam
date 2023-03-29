
import { db } from "@/config/firebase";
import { setDoc, doc } from "firebase/firestore";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
const cookiePrefix= process.env.NEXTAUTH_COOKIE_PREFIX || 'next-auth.'
const useSecureCookies = process.env.NODE_ENV === 'production'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        },
        url: "https://accounts.google.com/o/oauth2/v2/auth"
      },
      wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
      profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          token: tokens.access_token
        };
      },

    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any, token: JWT }) {
      if (session && session.user) {
        session.user.username = session.user?.name.split(' ').join('').toLocaleLowerCase();
        session.user.uid = token.sub;
      }
      return session;
    },
    async signIn(params: any) {
      await setDoc(
        doc(db, 'users', `${params.user?.id}`),
        {
          name: params?.user.name,
          email: params?.user.email,
          image: params?.user.image,
          uid: params?.user.id,
          savedPosts: [],
          followers: [],
          following: [],
          createdAt: Date.now(),
          username: params.user.name && params.user?.name.split(' ').join('').toLocaleLowerCase(),
        },
        {
          merge: true,
        }
      );
      return true  
    },
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET as string,
}

export default NextAuth(authOptions)