import {
  doc,
  getDoc,
  arrayRemove,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { IUser } from "@/types/user";
import { z } from "zod";
const FollowSchema = z.object({
  id: z.string(),
  uid: z.string(),
  followedByName: z.string(),
  refreshData: z.function().args(z.void()).returns(z.void()),
  ssr: z.boolean(),
});
type FollowerProps = Pick<IUser, "followers">;

type HandleFollowProps = {
  id: string;
  uid: string;
  followedByName: string;
  refreshData: () => void;
  ssr: boolean;
};
export const handleFollow = async <T extends HandleFollowProps>(props: T) => {
  const { id, uid, followedByName, refreshData, ssr } = props;
  try {
    const isValidArgs = FollowSchema.parse({
      id,
      uid,
      followedByName,
      refreshData,
      ssr,
    });
    if (!isValidArgs)
      throw new Error("Invalid data passed to handleFollow function.");

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
            }),
          }
        : {
            followers: arrayUnion({
              followedBy: uid,
              followedByName: followedByName,
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
      ]).then(() => {
        ssr ? refreshData() : null;
      });
    }
  } catch (error: any) {
    console.log(error.message);
  }
};
