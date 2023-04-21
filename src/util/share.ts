import toast from "react-hot-toast";

export function share(post: any, url: string) {
  try {
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
      toast.error("Share not supported");
    }
  } catch (error: any) {
    toast.error(error.message);

  }
}
