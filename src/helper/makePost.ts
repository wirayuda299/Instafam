import { storage, db } from "@/config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";

export async function makePost(captions:string, croppedImg:string, session:Session | null,setCaptions:SetterOrUpdater<string>, setImg:SetterOrUpdater<string>, setLoading:Dispatch<SetStateAction<boolean>>, img:string) {
  if (!img) return;
		setLoading(true);
		const hashtags =
			captions
				.match(/#(?!\n)(.+)/g)
				?.join(' ')
				.split(' ') || [];
  const uuid = crypto.randomUUID();
  try {
    const storageRef =`post/${uuid}/image`

    const imageRef = ref(storage, storageRef);
    await uploadString(imageRef, croppedImg ?? '', 'data_url').then(
      async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await setDoc(doc(db, 'posts', `post-${uuid}`), {
          captions: captions.match(/^[^#]*/),
          postedById: session?.user?.uid,
          author: session?.user && session?.user.username,
          comments: [],
          image: downloadUrl,
          postedByPhotoUrl: session?.user?.image,
          likedBy: [],
          storageRef,
          createdAt: Date.now(),
          hashtags,
          tags: [],
          postId: uuid,
        }).then(() => {
          setCaptions('');
          setImg('');
          setLoading(false);
        });
      }
    );
  } catch (error: any) {
    setLoading(false);
    console.error(error.message);
  }
}