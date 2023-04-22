import { useDarkModeStore, usePostModalStore, useSelectedPostStore } from "@/stores/stores"
import { useStore } from "zustand"
import { useEffect, useState } from "react"
import { IUserPostProps } from "@/types/post"
import { getAllPosts } from "@/helper/getPosts"
import { AiOutlineArrowLeft } from "react-icons/ai"
import dynamic from "next/dynamic"
const PostLoader = dynamic(() => import("@/components/Loader/Post"), {
  ssr: true,
});
const PostCard = dynamic(() => import("@/components/Post"), {
  ssr: true,
});
export default function PostModal() {
  const { postModal, setPostModal } = useStore(usePostModalStore)
  const { selectedPost, setSelectedPost } = useStore(useSelectedPostStore)
  const [posts, setPosts] = useState<IUserPostProps[]>([])
  const [loading, setLoading] = useState(true)
  const {darkMode} = useStore(useDarkModeStore)
  useEffect(() => {
    try {
      const getPosts = async () => {
        const res = await getAllPosts()
        setPosts(res.filter((p) => p.postId !== selectedPost?.postId));
        setLoading(false)
      }
      getPosts()

    } catch (error: any) {
      console.log(error.message)

    }

  }, [selectedPost, postModal])

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        setPostModal(false)
        setSelectedPost(null)
      }
    })
  }, [postModal, selectedPost])
  return (
    <>
      {selectedPost && postModal && (
        <div
          className={` fixed left-0 lg:hidden top-0 z-[99] h-screen w-full  select-none !overflow-x-hidden !overflow-y-auto  bg-white shadow-sm  ${postModal ? "animate-scaleUp" : "animate-scaleDown"
            }`}
          aria-modal="true"
          role="dialog"
        >
          <div className="w-full relative">
            <div className={`w-full border-b border-gray-500 border-opacity-50 sticky top-0 z-30 py-3 flex items-center px-3 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <div>
                <button className="text-left" onClick={() => {
                  setPostModal(false)
                  setSelectedPost(null)
                }}>
                  <AiOutlineArrowLeft size={25} />
                </button>
              </div>

            </div>
            <div className="p-2 z-10">
              <PostCard post={selectedPost} />
              {loading && (
                <PostLoader />
              )}
              {posts.map((post) => (
                <PostCard key={post.postId} post={post} />
              ))}

            </div>

          </div>

        </div>
      )}

    </>
  )
}
