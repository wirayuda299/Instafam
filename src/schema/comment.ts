import { z } from "zod";
import { PostSchema } from "./PostSchema";

export const SessionSchema = z
  .object({
    user: z.object({
      uid: z.string().min(1).max(100).nonempty(),
      username: z.string().min(1).max(100).nonempty(),
      image: z.string(),
      email: z.string().email(),
    }),
  })
  .nullable();

export const CommentSchemaProps = z.object({
  post: PostSchema,
  session: SessionSchema,
  commentOpen: z.boolean(),
  comments: z
    .array(
      z.object({
        comment: z.string(),
        commentByPhoto: z.string(),
        commentByName: z.string(),
        commentByUid: z.string(),
        createdAt: z.number().or(z.string()),
      })
    )
    .nullish(),
});
