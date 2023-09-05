const KB = 1024;
const MB = KB * 1024;
const GB = MB * 1024;

export const getFileSize = (size: number) => {
  if (size <= MB) {
    return Math.ceil(size / KB) + ' KB';
  } else if (size > MB && size <= GB) {
    return Math.ceil(size / MB) + ' MB';
  } else if (size > GB) {
    return Math.ceil(size / GB) + ' GB';
  }
};

export const getFileSrcFromResponse = (response: string) => {
  return response;
};
