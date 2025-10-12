import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { CreateTrackRequest, CreateTrackResponse, TrackMeta } from '@aimusic/shared';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracks: TracksService) {}

  @Get()
  async list(): Promise<TrackMeta[]> {
    return this.tracks.list();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<TrackMeta | undefined> {
    return this.tracks.get(id);
  }

  @Post()
  async create(@Body() body: CreateTrackRequest): Promise<CreateTrackResponse> {
    return this.tracks.create(body);
  }
}
