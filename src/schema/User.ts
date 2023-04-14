import { z } from "zod";
import { PostSchema } from "./PostSchema";
export const userSchema = z
  .object({
    image: z.string(),
    createdAt: z.string().or(z.number()),
    following: z.array(
      z.object({
        userId: z.string(),
      })
    ),
    followers: z.array(
      z.object({
        followedBy: z.string(),
        followedByName: z.string(),
      })
    ),
    email: z.string(),
    savedPosts: z.array(PostSchema).nullish(),
    uid: z.string(),
    username: z.string(),
    name: z.string(),
  })
  .nonstrict();
