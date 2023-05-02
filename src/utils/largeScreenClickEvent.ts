import { ActionsType } from "@/types/ActionsTypes"
import { IUserPostProps } from "@/types/post"
import type { Dispatch } from "react"

type LargeScreenClickEvent = (dispatch: Dispatch<ActionsType>, post: IUserPostProps) => void


export const largeScreenClickEvent: LargeScreenClickEvent = (Dispatch, post) => {
  Dispatch({
    type: 'TOGGLE_POST_PREVIEW_MODAL',
    payload: {
      postPreviewModal: true
    }
  })
  Dispatch({
    type: "SELECT_POST", payload: {
      post
    }
  })
}