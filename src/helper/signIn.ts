import { getCsrfToken, signIn } from "next-auth/react";

export const handleSignin = async (providerId: string) => {
  try {
    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
      throw new Error('CSRF token not found');
    }
    await signIn(providerId, {
      redirect: false,
      callbackUrl: process.env.NEXTAUTH_URL,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};