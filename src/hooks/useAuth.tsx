import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useAuth() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) router.push("/auth/signin");
  }, [session]);

  return { session };
}
