import { IUser } from "@/types/user";

type FollowerProps = Pick<IUser, "followers">;

type HandleFollowProps = {
  id: string;
  uid: string;
  followedByName: string;
  followedImage: string;
};
export const handleFollow = async <T extends HandleFollowProps>(props: T) => {
  const { id, uid, followedByName, followedImage } = props;
  try {

    const { doc, getDoc, arrayRemove, arrayUnion, updateDoc } = await import(
      "firebase/firestore"
    );
    const { db } = await import("@/config/firebase");
    if(!uid || !id || !followedByName) throw new Error("uid, id, followedByName is required")

    const userRef = doc(db, "users", id);
    const currentUserRef = doc(db, "users", `${uid}`);

    const [getUsers] = await Promise.all([
      getDoc(userRef),
      getDoc(currentUserRef),
    ]);

    if (getUsers) {
      const res = getUsers.data();
      const hasFollow: boolean = res?.followers.some(
        (follower: FollowerProps["followers"][0]) => follower.followedBy === uid
      );
      const updateAuthorFollowersLists = hasFollow
        ? {
          followers: arrayRemove({
            followedBy: uid,
            followedByName: followedByName,
            followedImage: followedImage,
          }),
        }
        : {
          followers: arrayUnion({
            followedBy: uid,
            followedByName: followedByName,
            followedImage: followedImage,
          }),
        };

      const updateCurrentUserFollowingLists = hasFollow
        ? {
          following: arrayRemove({ userId: id }),
        }
        : { following: arrayUnion({ userId: id }) };

      await Promise.all([
        updateDoc(userRef, updateAuthorFollowersLists),
        updateDoc(currentUserRef, updateCurrentUserFollowingLists),
      ])
    }
  } catch (error: any) {
    console.log(error.message);
  }
};
