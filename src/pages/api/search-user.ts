import { db } from "@/config/firebase";
import { query, collection, getDocs } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search } = req.query;
  const session = await getServerSession(req, res, authOptions);
  const isString = typeof search === "string";
  const isGetmethod = req.method === "GET";

  if (!session || !isString || !isGetmethod) {
    return res.status(401).end("Unauthorized");
  }

  if (req.cookies && session) {
    const q = query(collection(db, "users"));
    const response = await getDocs(q);
    const result = response.docs.map((doc) => doc.data());
    const regex = new RegExp(`${search}`, "gi");
    const filtered = result.filter(
      (user) => regex.test(user.name) || regex.test(user.username)
    );
    return res.status(200).json(filtered ?? []);
  }
}
