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

interface FileUploadFuncArgs {
  file: File;
  url?: string;
  onDone?: (e: Event) => void;
  onProgress?: (loaded: number) => void;
  onError?: (e: Event) => void;
}

export const defaultFileUploadFunc = ({
  file,
  url,
  onProgress,
  onError,
  onDone
}: FileUploadFuncArgs) => {
  if (!url) return;

  const request = new XMLHttpRequest();

  if (onProgress) {
    request.upload.addEventListener('progress', (e) => {
      onProgress?.(e.loaded);
    });
  }

  request.addEventListener('loadend', (e) => onDone?.(e));
  request.onerror = (e) => {
    onError?.(e);
  };

  request.open('post', url, true);
  request.setRequestHeader('Content-Type', 'multipart/form-data');

  const formData = new FormData();
  formData.set('file', file);
  request.send(formData);
};

interface FileDeleteFuncArgs {
  filename: string;
  url?: string;
  onDone?: (e: Event) => void;
  onError?: (e: Event) => void;
}

export const defaultFileDeleteFunc = async ({
  filename,
  url,
  onError,
  onDone
}: FileDeleteFuncArgs) => {
  if (!url) return;

  try {
  } catch (err) {}
  const response = await fetch(url, {
    method: 'delete'
  });
};
