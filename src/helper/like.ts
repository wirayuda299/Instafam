import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { IUserPostProps } from '@/types/post';

type THandleLikes = (post: IUserPostProps, uid: string, refreshData: () => void, ssr?: boolean) => void;

export const handleLikes: THandleLikes = async (post, uid, refreshData, ssr) => {
	if (typeof window === 'undefined') return;
	try {
		const postRef = doc(db, 'posts', `post-${post.postId}`);
		const getPostDetails = await getDoc(postRef);
		const likedBy = getPostDetails.data()?.likedBy;
		const haslikedByUsers = likedBy.find((like: string) => like === uid);

		if (haslikedByUsers) {
			await updateDoc(postRef, { likedBy: arrayRemove(uid) }).then(() => {
				ssr ? refreshData() : null;
			});
		} else {
			await updateDoc(postRef, { likedBy: arrayUnion(uid) }).then(() => {
				ssr ? refreshData() : null;
			});
		}
	} catch (error: any) {
		console.error(error.message);
	}
};


// export async function handleLikes(
// 	post: IUserPostProps,
// 	uid: string = '',
// 	refreshData: () => void,
// 	ssr?: boolean
// ){
// 	if (typeof window === 'undefined') return;
// 	try {
// 		const postRef = doc(db, 'posts', `post-${post.postId}`);
// 		const getPostDetails = await getDoc(postRef)
// 		const likedBy = getPostDetails.data()?.likedBy
// 		const haslikedByUsers = likedBy.find((like: string) => like === uid)

// 		if (haslikedByUsers) {
// 			await updateDoc(postRef, { likedBy: arrayRemove(uid) })
// 				.then(() => {
// 					ssr ? refreshData() : null;
// 				})
// 		} else {
// 			await updateDoc(postRef, { likedBy: arrayUnion(uid) }).then(() => {
// 				ssr ? refreshData() : null;
// 			})
// 		}
// 	} catch (error: any) {
// 		console.error(error.message);
// 	}
// }


