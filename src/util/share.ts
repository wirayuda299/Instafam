
export function share(post:any, url:string) {
  if (navigator.share) {  // check if the Web Share API is supported
    navigator.share({
      title: post.captions,
      text: post.captions,
      url: url
    })
    .then(() => {
      console.log('Successfully shared');
    })
    .catch((err) => {
      console.error('Error sharing:', err);
    });
  } else {
    console.log('Web Share API not supported');
  }
}
