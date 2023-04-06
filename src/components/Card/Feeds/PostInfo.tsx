import { AiFillHeart, AiTwotoneMessage } from "react-icons/ai";

export default function PostInfo({post}:any) {
  return (
    <div className='absolute inset-0 flex justify-around items-center bg-black bg-opacity-0 hover:bg-opacity-25'>
    <button
      type='button'
      name='likes count button'
      title='likes count button'
      className='opacity-0 group-hover:opacity-100 transition-all ease duration-500 text-center text-white'
    >
      <p className='text-center flex items-center space-x-2'>
        <AiFillHeart size={35} color={'white'} />
        <small className='font-semibold text-sm'>
          {post?.likedBy.length}
        </small>
      </p>
    </button>
    <button
      type='button'
      title='comments count button'
      name='posts comment count button'
      className='opacity-0 group-hover:opacity-100 transition-all ease duration-500 text-center text-white'
    >
      <p className='text-center flex items-center space-x-2'>
        <AiTwotoneMessage size={35} color={'white'} />
        <small className='font-semibold text-sm'>
          {post?.comments.length}
        </small>
      </p>
    </button>
  </div>
  )
}
