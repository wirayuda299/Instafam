import { DebouncedFunc } from "lodash";
import { Dispatch, FormEvent } from "react";

export interface IPropsButtonsComp {
  likedBy: string[];
  docId: string;
  debounceHandleLike: DebouncedFunc<(id: string) => Promise<void>>;
  savePost?: () => void;
  handleComment?: (id: FormEvent<HTMLFormElement>) => Promise<void> | undefined;
  disabled: boolean;
  comments?: string[];
  setCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  commentOpen: boolean;
  refetch: () => void;
}

export interface ICardBodyProps extends IPropsButtonsComp {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setHidden: Dispatch<React.SetStateAction<boolean>>;
  setComment: Dispatch<React.SetStateAction<string>>;
  open: boolean;
  postedBy: string;
  hidden: boolean;
  caption: string;
  comment: string;
}
