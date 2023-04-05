import { doc, getDoc, arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { IUser } from "@/types/user";
type FollowerProps = Pick<IUser, 'followers'>


export async function handleFollow(id: string = '', uid: string = '', followedByName: string = ''): Promise<void> {
  try {

    const userRef = doc(db, 'users', id);
    const currentUserRef = doc(db, 'users', `${uid}`);

    const [getUsers] = await Promise.all([getDoc(userRef), getDoc(currentUserRef)]);

    if (getUsers) {
      const res = Array(getUsers.data());
      const hasFollow: boolean = res[0]?.followers.some((follower: FollowerProps['followers'][0]) => follower.followedBy === uid);
      const updateAuthorFollowersLists = hasFollow
        ? {
          followers: arrayRemove({
            followedBy: uid,
            followedByName: followedByName
          })
        }
        : {
          followers: arrayUnion({
            followedBy: uid,
            followedByName: followedByName
          })
        };

      const updateCurrentUserFollowingLists = hasFollow ? {
        following: arrayRemove({ userId: id })
      }
        : { following: arrayUnion({ userId: id }) };

      await Promise.all([
        updateDoc(userRef, updateAuthorFollowersLists),
        updateDoc(currentUserRef, updateCurrentUserFollowingLists)
      ])
    }
  } catch (error: any) {
    console.log(error.message);
  }
};
