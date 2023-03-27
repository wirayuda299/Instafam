import { db } from '@/config/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === 'GET') {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const posts = querySnapshot.docs.map(doc => doc.data())
      res.status(200).json({ posts }) 
    } else {
      res.status(400).json({ message: 'Bad request' })
    }
  }
