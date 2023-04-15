import { db } from "@/config/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { search } = req.query;
    if (req.method !== "GET") {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    if (!search) {
      return res.status(400).end("No search query provided");
    }
    if (search.length < 3) {
      return res
        .status(400)
        .end("Search query must be at least 3 characters long");
    }
    if (req.cookies) {
      const queryUsername = query(
        collection(db, "users"),
        where("username", "==", search)
      );
      const queryName = query(
        collection(db, "users"),
        where("name", "==", search)
      );
      const resQUsername = await getDocs(queryUsername);
      const data = resQUsername.docs.map((doc) => doc.data());
      const resQName = await getDocs(queryName);
      const data2 = resQName.docs.map((doc) => doc.data());
      const data3 = data.concat(data2);
      if (data3.length === 0) {
        return res.status(404).end("No users found");
      }
      return res.status(200).json(data3);
    }
    return res.status(401).end("Unauthorized");
  } catch (error) {
    return res.status(500).end("Internal server error");
  }
}
