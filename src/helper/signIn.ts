import { getCsrfToken, signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { z } from "zod";

const signInSchema = z.object({
  providerId: z
    .string()
    .nonempty()
    .regex(/^(google)$/i)
    .nonempty(),
});

export const handleSignin = async (providerId: string) => {
  try {
    const csrfToken = await getCsrfToken();

    if (!csrfToken) {
      return new Error("No csrf token found");
    }
    const isValid = signInSchema.parse({ providerId });
    if (!isValid) return new Error("Invalid providerId");
    const secret = process.env.GOOGLE_SECRET;
    const id = process.env.GOOGLE_ID;
    if (!secret || !id) return new Error("No secret or id found");

    await signIn(providerId, {
      redirect: false,
      callbackUrl: `${process.env.NEXTAUTH_URL}`,
    }).then(() => {
      toast.success("Signed in successfully");
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
