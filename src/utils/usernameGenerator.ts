export function getUsernameFromEmail(email: string) {
  try {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      return email.slice(0, atIndex);
    } else {
      return email;
    }
  } catch (error: any) {
    console.log(error.message);
  }
}
