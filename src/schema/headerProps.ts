import {z} from 'zod';
import { SessionSchema } from './comment';
import { PostSchema } from './PostSchema';
export const Headerprops = z.object({
  session: SessionSchema,
  post:PostSchema,
  setIsMenuOpen: z.function().args(z.any()).returns(z.any()),
  isMenuOpen: z.boolean(),
})