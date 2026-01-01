import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

import { ENV } from '@/config/env.js';
import type { UploadImageParams, UploadImageResult } from '@/shared/storage/types.js';

export class StorageService {
  private client: ReturnType<typeof createClient>;
  private bucket: string;

  constructor() {
    this.client = createClient(ENV.supabaseUrl!, ENV.supabaseServiceKey!);
    this.bucket = ENV.supabaseBucket!;
  }

  async uploadImage({ imageBytes }: UploadImageParams): Promise<UploadImageResult> {
    try {
      const imageKey = `${new Date().toISOString().slice(0, 10)}/${randomUUID()}.png`;

      const { error } = await this.client.storage.from(this.bucket).upload(imageKey, imageBytes, {
        contentType: `image/png`,
        cacheControl: 'public, max-age=31536000, immutable',
        upsert: false,
      });
      if (error) throw error;

      const { data: publicUrl } = this.client.storage.from(this.bucket).getPublicUrl(imageKey);

      return { url: publicUrl.publicUrl, imageKey };
    } catch (error) {
      console.error('The storage service had an error uploading the image: ', error);
      // TODO: Enhance error handling.
      throw error;
    }
  }
}
