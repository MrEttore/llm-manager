export type UploadImageParams = {
  imageBytes: Buffer;
};

export type UploadImageResult = {
  url: string;
  imageKey: string;
};
