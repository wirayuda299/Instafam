import { PostSchema } from "@/schema/PostSchema";
import { z } from "zod";
const postSchema = z.object({
  post: PostSchema,
  url: z.string().url(),
});
export function share(post: any, url: string) {
  try {
    const isValid = postSchema.parse({ post, url });
    if (!isValid) throw new Error("Invalid post or url");
    if (navigator.share) {
      navigator
        .share({
          title: post.captions,
          text: post.captions,
          url: url,
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((err) => {
          console.error("Error sharing:", err);
        });
    } else {
      console.log("Web Share API not supported");
    }
  } catch (error: any) {}
}
