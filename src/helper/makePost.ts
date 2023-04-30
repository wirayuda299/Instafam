import { storage, db } from "@/config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import type { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";


type TMakePost = {
  captions: string;
  croppedImg: string;
  session: Session | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  img: string;
  blurDataUrl: string;
};

type ParseCaptions = (captions: string) => string[] | undefined;

const parseHashtags: ParseCaptions = (captions) => {
  return captions
    .match(/#(?!\n)(.+)/g)
    ?.join(" ")
    .split(" ");
};


export const makePost = async <T extends TMakePost>(params: T) => {
  const {
    captions,
    croppedImg,
    session,
    setLoading,
    img,
    blurDataUrl
  } = params;

  if (!img || !session || !session.user) throw new Error("No image found or user not logged in");
 
  setLoading(true);
  const hashtags = parseHashtags(captions);
  const uuid = crypto.randomUUID();

  try {
    const storageRef = `post/${uuid}/image`;

    const imageRef = ref(storage, storageRef);
    await uploadString(imageRef, croppedImg ?? "", "data_url").then(
      async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await setDoc(doc(db, "posts", `post-${uuid}`), {
          captions: captions.match(/^[^#]*/),
          postedById: session?.user?.uid,
          author: session?.user && session?.user.username,
          comments: [],
          image: downloadUrl,
          postedByPhotoUrl: session?.user?.image,
          likedBy: [],
          storageRef,
          createdAt: Date.now(),
          hashtags: hashtags ?? [],
          tags: [],
          postId: uuid,
          blurDataUrl
        })
      }
    );
  } catch (error: any) {
    setLoading(false);
    toast.error(error.message);
  }
};
