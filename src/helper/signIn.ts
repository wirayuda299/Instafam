import { getCsrfToken, signIn } from "next-auth/react";
import {z} from 'zod';
const signInSchema = z.object({
  providerId: z.string().nonempty().regex(/^(google)$/i)
})

export const handleSignin = async (providerId: string) => {
  try {
    const isValid = signInSchema.parse({ providerId });
    if (!isValid) throw new Error('Invalid data passed to function. providerId must be a string passed to the function and cannot be empty.');
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