export function getUsernameFromEmail(email:string) {
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    return email.slice(0, atIndex);
  } else {
    return email; // return the original email if there is no @ character
  }
}
