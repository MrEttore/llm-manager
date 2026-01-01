export type Model = 'gpt-image-1-mini' | 'gpt-image-1' | 'gpt-image-1.5' | undefined;
export type NumberOfImages = number | undefined;
export type Quality = 'low' | 'medium' | 'high' | 'auto' | undefined;
export type Size = '1024x1024' | '1536x1024' | '1024x1536' | 'auto' | undefined;
export type OutputFormat = 'png' | 'webp' | 'jpeg' | undefined;
export type Meta = {
  created: number;
  size: '1024x1024' | '1536x1024' | '1024x1536' | undefined;
  quality: 'low' | 'medium' | 'high' | undefined;
  outputFormat: 'png' | 'webp' | 'jpeg' | undefined;
};

export type GenerateImageBytesParams = {
  prompt: string;
  model: Model;
  n: NumberOfImages;
  quality: Quality;
  size: Size;
};

export type GenerateImageBytesResult = {
  imageBytes: Buffer;
  meta: Meta;
};
