import {z} from 'zod';
const emailSchema = z.string().email();

export function getUsernameFromEmail(email:string) {
  try {
    const isValid = emailSchema.parse(email);
    if (!isValid) throw new Error('Invalid email');
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.slice(0, atIndex);
    } else {
      return email; 
    }
    
  } catch (error: any) {
    console.log(error.message);
    
  }
}
