import { useStateContext } from '@/stores/StateContext';
import { IUser } from '@/types/user';
import type { Session } from 'next-auth';
import Image from 'next/image'
import Link from 'next/link';
import { useStore } from 'zustand';
type Props = {
  follower: {
    followedBy: string;
    followedByName: string;
    followedImage: string;
  },
  darkMode: boolean;
  session: Session | null
  user: IUser
}
export default function NotificationUser({ follower, darkMode, session, user }: Props) {
  const {Dispatch} = useStateContext()
  return (
    
    <div className="flex items-center space-x-2 mt-4 px-4">
      <Image
        src={follower.followedImage}
        width={40}
        height={40}
        className="rounded-full"
        alt={follower.followedByName}
        priority />
      <div className="text-sm ">
        <div>
          <div className="flex space-x-3 flex-wrap place-items-center">
            <Link href={`/profile/${follower.followedByName}`} onClick={() => {
              Dispatch({
                type: 'TOGGLE_NOTIFICATION_DRAWER',
                payload: {
                  notificationDrawer: false
                }
              })
            }}>
              <h1 className={darkMode ? 'text-white' : 'text-black'}>
                {follower.followedByName}
              </h1>
              <span className="text-gray-500 text-xs truncate">started following you</span>
            </Link>
            <button
              className="bg-blue-500 px-5 py-1 mt-2 rounded-md"
              onClick={async () => {
                const { handleFollow } = await import('@/helper/follow')
                const followArgs = {
                  id: follower.followedBy,
                  uid: session?.user?.uid as string,
                  followedByName: session?.user?.username as string,
                  followedImage: session?.user?.image as string,
                  followedDate: Date.now()
                }
                await handleFollow(followArgs)
              }}
            >
              <span className="text-xs text-white">
                {user.following.find(user => user.userId === follower.followedBy) ? "Following" : "Follow"}
              </span>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
