import { Injectable } from '@nestjs/common';
import type { CreateTrackRequest, CreateTrackResponse, TrackMeta } from '@aimusic/shared';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TracksService {
  private readonly inMemoryTracks: TrackMeta[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<TrackMeta[]> {
    try {
      if (!process.env.DATABASE_URL) throw new Error('no-db');
      const tracks = await this.prisma.track.findMany({ orderBy: { createdAt: 'desc' } });
      return tracks as unknown as TrackMeta[];
    } catch {
      return this.inMemoryTracks;
    }
  }

  async get(id: string): Promise<TrackMeta | undefined> {
    try {
      if (!process.env.DATABASE_URL) throw new Error('no-db');
      const track = await this.prisma.track.findUnique({ where: { id } });
      return track as unknown as TrackMeta | undefined;
    } catch {
      return this.inMemoryTracks.find((t) => t.id === id);
    }
  }

  async create(body: CreateTrackRequest): Promise<CreateTrackResponse> {
    const now = new Date().toISOString();
    const data: TrackMeta = {
      id: Math.random().toString(36).slice(2),
      title: body.title,
      description: body.description,
      isPublic: Boolean(body.isPublic ?? true),
      ownerId: 'demo-user',
      createdAt: now,
      updatedAt: now,
    };

    try {
      if (!process.env.DATABASE_URL) throw new Error('no-db');
      const created = await this.prisma.track.create({
        data: {
          id: data.id,
          title: data.title,
          description: data.description,
          isPublic: data.isPublic,
          ownerId: data.ownerId,
          durationMs: data.durationMs ?? null,
          genres: [],
          hashtags: [],
        },
      });
      return { track: created as unknown as TrackMeta };
    } catch {
      this.inMemoryTracks.unshift(data);
      return { track: data };
    }
  }
}
