export interface IUserPostProps {
  likes: number;
  captions: string,
  image: string
  postedById: string
  author: string
  postedByPhotoUrl: string
  storageRef: string,
  likedBy: string[]
  createdAt: string | number
  comments: {
    commentByUid: string,
    comment: string,
    commentByName: string,
    commentByPhoto: string,
    createdAt: string | number
  }[]
  hashtags: string[]
  postId: string
  posts: []
  followers: []
  following: []
  savedPosts: IUserPostProps[]
  tagged: []
}