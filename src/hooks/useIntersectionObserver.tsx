import { useEffect, useState } from 'react';
import { collection, query, orderBy, startAfter, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase'; // replace this with your own Firebase config file
import { IUserPostProps } from '@/types/post';

export const useIntersectionObserver = (allData:any[]) => {
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState<IUserPostProps[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const newPosts = await getDocs(
          query(
            collection(db, 'posts'), 
            orderBy('createdAt', 'desc'),
            startAfter(allData.slice(-1)[0].createdAt)
          )
        )
        const newPostData = newPosts.docs.map((doc) => doc.data());
        setLoading(false);
        setNewData(newPostData as IUserPostProps[]);
      }
    });
    const lastPost = document.getElementById('last');
    if (lastPost) {
      observer.observe(lastPost);
    }
    return () => {
      observer.disconnect();
    }
  }, [allData]);

  return { loading, newData };
}
