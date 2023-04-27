import { db } from "@/config/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = [{}];
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end("Unauthorized");
  const { search } = req.query;
  if (req.method !== "GET") {
    res.json(data);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  if (!search) {
    res.json(data);
    return res.status(400).end("No search query provided");
  }
  if (search.length < 3) {
    res.status(400);
    res.json(data);
    res.end("Search query must be at least 3 characters long");
  }
  if (req.cookies) {
    const q = query(collection(db, "users"));
    const response = await getDocs(q);
    const result = response.docs.map((doc) => doc.data());
    const regex = new RegExp(`${search}`, "gi");
    const filtered = result.filter(
      (user) => regex.test(user.name) || regex.test(user.username)
    );
    return res.status(200).json(filtered || []);
  }
}
