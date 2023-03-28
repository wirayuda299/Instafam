import { db } from '@/config/firebase'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {  
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), where('postedById', '==', `${req.query.userId}`))
      const querySnapshot = await getDocs(q)
      const posts = querySnapshot.docs.map(doc => doc.data())
      res.status(200).json({ posts }) 
  
  }
