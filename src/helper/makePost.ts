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
  setCaptions: Dispatch<SetStateAction<string>>;
  setImg: (postImageModal: string) => void;
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
    setCaptions,
    setImg,
    setLoading,
    img,
    blurDataUrl
  } = params;

  if (!img) return;
  if (!session || !session.user) {
    return toast.error("You must be logged in to make a post.");
  }

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
        }).then(() => {
          setCaptions("");
          setImg("");
          setLoading(false);
          toast.success("Post created successfully");
        });
      }
    );
  } catch (error: any) {
    setLoading(false);
    toast.error(error.message);
  }
};
