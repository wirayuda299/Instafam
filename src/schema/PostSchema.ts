import {z} from 'zod';
export const PostSchema = z.object({
	postId: z.string(),
	likes: z.number().nullable().optional(),
	image: z.string(),
	postedByPhotoUrl: z.string(),
	postedById: z.string(),
	storageRef: z.string(),
	likedBy: z.array(z.string()).nullable(),
	createdAt: z.number().and(z.number().positive()).or(z.string()),
	comments: z.array(z.object({
		comment: z.string(),
		commentByPhoto: z.string(),
		commentByName: z.string(),
		commentByUid: z.string(),
		createdAt: z.number(),
	})).optional(),
	hashtags: z.array(z.string()).nullable(),
	tagged: z.array(z.string()).optional(),
})
export const UidSchema = z.string().and(z.string().nonempty()).and(z.string().min(1)).and(z.string().max(100))
export const PropsChema = z.object({
	post: PostSchema,
	uid: UidSchema,
	setCommentOpen: z.function().args(z.any()).returns(z.any()),
	commentOpen: z.boolean(),
	likes: z.array(z.string()).nullable().optional(),
	savedPosts: z.array(z.string()).nullable().optional(),
	refreshData: z.function().args(z.any()).returns(z.any()),
	ssr: z.boolean(),

})
