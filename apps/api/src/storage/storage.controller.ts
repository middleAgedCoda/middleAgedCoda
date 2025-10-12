import { Body, Controller, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { StorageService } from './storage.service';

interface PresignBody {
  folder?: string;
  contentType: string;
  filename?: string;
}

@Controller('upload')
export class StorageController {
  constructor(private readonly storage: StorageService) {}

  @Post('presign')
  async presign(@Body() body: PresignBody) {
    const extension = body.filename?.split('.').pop()?.toLowerCase() || 'bin';
    const allowed = new Set(['wav', 'mp3', 'flac', 'ogg', 'm4a', 'aac']);
    if (!allowed.has(extension)) {
      return { error: 'Unsupported file type', allowed: Array.from(allowed) };
    }
    const key = `${body.folder ?? 'tracks'}/${randomUUID()}.${extension}`;
    return this.storage.createPresignedPutUrl({ key, contentType: body.contentType });
  }
}
