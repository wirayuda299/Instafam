import { useDarkModeStore } from '@/stores/stores'
import { IUser } from '@/types/user'
import Image from 'next/image'
import Link from 'next/link'
import { useStore } from 'zustand'

export default function SuggestionMobile({ user }: { user: IUser }) {
  const { darkMode } = useStore(useDarkModeStore)

  return (
    <div className={`w-44 h-44 flex flex-col ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} rounded-lg shadow-md border p-5 justify-center items-center relative`} >
      <Image
        src={user.image}
        width={50}
        height={50}
        className="rounded-full"
        loading='lazy'
        placeholder='blur'
        blurDataURL={user.image}
        alt={user.username} />
      <h2 className="font-bold mt-2 truncate w-full text-center" title={user.username}>
        {user.username}
      </h2>
      <Link className="bg-blue-500 w-32 h-7 rounded-md  text-center text-white mt-2 " href={`/profile/${user.username}`}>
        View Profile
      </Link>

    </div>
  )
}
