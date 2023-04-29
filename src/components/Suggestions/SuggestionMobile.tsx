import { IUser } from '@/types/user'
import Image from 'next/image'
import Link from 'next/link'
export default function SuggestionMobile({user}: {user:IUser}) {

  return (
    <div className="w-44 h-44 flex flex-col bg-white rounded-lg shadow-md border p-5 justify-center items-center" >
      <Image
        src={user.image}
        width={50}
        height={50}
        className="rounded-full"
        loading='lazy'
        placeholder='blur'
        blurDataURL={user.image}
        alt={user.username} />
      <h2 className="font-bold mt-2">
        {user.username}
      </h2>
      <Link className="bg-blue-500 rounded-md w-full py-1 text-center text-white mt-2" href={`/profile/${user.username}`}>
        View Profile
      </Link>

    </div>
  )
}
