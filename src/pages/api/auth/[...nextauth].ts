import { db } from "@/config/firebase";
import { getUsernameFromEmail } from "@/util/usernameGenerator";
import { setDoc, doc } from "firebase/firestore";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions:NextAuthOptions = {
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
        url: process.env.GOOGLE_URL as string
      },
      wellKnown: process.env.GOOGLE_WELL_KNOWN_URL as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },

    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any, token: JWT }) {
      if (session && session.user) {
        session.user.username = `@${getUsernameFromEmail(session.user.email)}`
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
          username: `@${getUsernameFromEmail(params?.user.email)}`,
        },
        {
          merge: true,
        }
      );
      return true  
    },
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      if (url === '/api/auth/signin') {
        return Promise.resolve(`${baseUrl}/auth/signin`)
      } else {
        return Promise.resolve(url)
      }
    },
  
  },
  pages: {
    signIn: '/auth/signin'
  },
 
  secret: process.env.NEXTAUTH_SECRET as string,
  useSecureCookies: process.env.NODE_ENV === 'production',
}

export default NextAuth(authOptions)