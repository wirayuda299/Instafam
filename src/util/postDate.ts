
export const getCreatedDate = (post: any) => {
  const now = Date.now();
  const diff = now - Number(post.createdAt);

  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  const diffInWeeks = diffInDays / 7;
  const diffInMonths = diffInDays / 30;
  const diffInYears = diffInDays / 365;

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)} ${Math.floor(diffInMinutes) > 1 ? 'minutes' : 'minute'
      } ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} ${Math.floor(diffInHours) > 1 ? 'hours' : 'hour'
      } ago`;
  } else if (diffInDays < 7) {
    return `${Math.floor(diffInDays)} ${Math.floor(diffInDays) > 1 ? 'days' : 'day'
      } ago`;
  } else if (diffInWeeks < 4) {
    return `${Math.floor(diffInWeeks)} ${Math.floor(diffInWeeks) > 1 ? 'weeks' : 'week'
      } ago`;
  } else if (diffInMonths < 12) {
    return `${Math.floor(diffInMonths)} ${Math.floor(diffInMonths) > 1 ? 'months' : 'month'
      } ago`;
  } else {
    return `${Math.floor(diffInYears)} ${Math.floor(diffInYears) > 1 ? 'years' : 'year'
      } ago`;
  }
};

export const getCommentcreatedAt = (comment:any) => {
  const now = Date.now();
  const diff = now - Number(comment.createdAt);

  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  const diffInWeeks = diffInDays / 7;
  const diffInMonths = diffInDays / 30;
  const diffInYears = diffInDays / 365;

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)} ${Math.floor(diffInMinutes) > 1 ? 'minutes' : 'minute'
      } ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} ${Math.floor(diffInHours) > 1 ? 'hours' : 'hour'
      } ago`;
  } else if (diffInDays < 7) {
    return `${Math.floor(diffInDays)} ${Math.floor(diffInDays) > 1 ? 'days' : 'day'
      } ago`;
  } else if (diffInWeeks < 4) {
    return `${Math.floor(diffInWeeks)} ${Math.floor(diffInWeeks) > 1 ? 'weeks' : 'week'
      } ago`;
  } else if (diffInMonths < 12) {
    return `${Math.floor(diffInMonths)} ${Math.floor(diffInMonths) > 1 ? 'months' : 'month'
      } ago`;
  } else {
    return `${Math.floor(diffInYears)} ${Math.floor(diffInYears) > 1 ? 'years' : 'year'
      } ago`;
  }

}


