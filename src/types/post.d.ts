type PostComments = {
  commentByUid: string;
  comment: string;
  commentByName: string;
  commentByPhoto: string;
  createdAt: string | number;
};
interface IUserPostProps {
  likes: number;
  captions: string;
  image: string;
  postedById: string;
  author: string;
  postedByPhotoUrl: string;
  storageRef: string;
  likedBy: string[];
  createdAt: string | number;
  comments: PostComments[];
  hashtags: string[];
  postId: string;
  tagged: [];
  savedBy: string[];
  blurDataUrl: string;
}
