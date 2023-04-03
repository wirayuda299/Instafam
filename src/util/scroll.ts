export const handleScroll = async (loadMore:() => Promise<void>) => {
  const { scrollTop } = document.documentElement;
  if (scrollTop === 0) {
    await loadMore();
  }
};