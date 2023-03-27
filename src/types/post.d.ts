export interface IUserPostProps {
  likes: number;
  captions: string,
  image: string
  postedById: string
  author: string
  postedByPhotoUrl: string
  docId: string,
  likedBy: string[]
  createdAt: string | number
  comments: ICommentsProps[]
  hashtags: string[]
  postId: string
  posts: []
  followers: []
  following: []
  savedPosts: []
  tagged: []
}