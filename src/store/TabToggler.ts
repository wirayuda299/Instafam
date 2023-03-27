import {atom} from 'recoil'
export const tabPosts = atom({
	key: 'tab posts',
	default: true
})
export const tabSavedPosts = atom({
  key: 'tab savedPosts',
  default: false
})
export const tabTaggedPosts = atom({
  key: 'tab taggedPosts',
  default: false
})