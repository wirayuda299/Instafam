import { normalize } from "path"
export const urlNormalize = (url: string) => {
  return normalize(url)
}