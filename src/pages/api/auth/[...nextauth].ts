
import { db } from "@/config/firebase";
import { setDoc, doc } from "firebase/firestore";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
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
      return true;
    },
  },

  pages: {
    signIn: '/auth/signin',

  },
  secret: process.env.NEXTAUTH_SECRET as string,
}

export default NextAuth({
  providers: [
    GoogleProvider({
      encoding: "base64",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",

        },
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
    async signIn(params) {
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
      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',

  },
  secret: process.env.NEXTAUTH_SECRET as string,

})