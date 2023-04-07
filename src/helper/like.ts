import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { IUserPostProps } from '@/types/post';

export async function handleLikes(
	post: IUserPostProps,
	uid: string = '',
	refreshData: () => void
) {
	if (typeof window === 'undefined') return;
	try {
		const postRef = doc(db, 'posts', `post-${post.postId}`);
		const getPostDetails = await getDoc(postRef)
		const likedBy = getPostDetails.data()?.likedBy
		const haslikedByUsers = likedBy.find((like: string) => like === uid)

		if (haslikedByUsers) {
			await updateDoc(postRef, { likedBy: arrayRemove(uid) })
				.then(() => {
					refreshData()
				})
		} else {
			await updateDoc(postRef, { likedBy: arrayUnion(uid) }).then(() => {
				refreshData()	
			})
		}
	} catch (error: any) {
		console.error(error.message);
	}
}


