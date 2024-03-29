import Link from "next/link";
import type { FC } from "react";

import { useModalContext } from "@/stores/Modal/ModalStatesContext";
import { getCreatedDate } from "@/utils/postDate";

type Props = {
  author: string;
  createdAt: string | number;
};

const CreatedTime: FC<Props> = ({ createdAt, author }) => {
  const createdAtTime = getCreatedDate(createdAt);
  const {
    modalStates: { postModal },
    modalDispatch,
  } = useModalContext();
  return (
    <div className={`ml-3 flex w-full items-center justify-between`}>
      <div>
        <div>
          <h2>
            <Link
              onClick={() =>
                postModal
                  ? modalDispatch({
                      type: "TOGGLE_POST_MODAL",
                      payload: {
                        postModal: false,
                      },
                    })
                  : null
              }
              href={`/profile/${author}`}
              prefetch={false}
              className="block text-sm font-semibold leading-tight antialiased"
            >
              {author}
            </Link>
          </h2>
          <span
            className={`block text-left font-thin leading-tight text-slate-400 antialiased xs:text-[10px] sm:text-xs `}
          >
            {createdAtTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreatedTime;
