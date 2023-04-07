export function copyLink(url:string) {
  navigator.clipboard.writeText(url)
    .then(() => {
      alert(`Copied url to clipboard`);
    })
    .catch((err) => {
      console.error(`Error copying ${url} to clipboard: ${err}`);
    });
}