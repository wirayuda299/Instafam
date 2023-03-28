import { db } from "@/config/firebase"
import { query, collection, where, getDocs } from "firebase/firestore"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const q = query(collection(db, 'users'), where('uid', '==', `${req.query.userId}`))
    const querySnapshot = await getDocs(q)
    const user = querySnapshot.docs.map(doc => doc.data())
    res.status(200).json({ user })

  } catch (error) {
    res.status(400).json({ error })
  }

}