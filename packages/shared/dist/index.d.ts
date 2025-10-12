export type UserId = string;
export interface UserProfile {
    id: UserId;
    displayName: string;
    handle: string;
    avatarUrl?: string;
}
export type TrackId = string;
export interface TrackMeta {
    id: TrackId;
    title: string;
    description?: string;
    ownerId: UserId;
    durationMs?: number;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    genres?: string[];
    hashtags?: string[];
}
export interface CreateTrackRequest {
    title: string;
    description?: string;
    isPublic?: boolean;
}
export interface CreateTrackResponse {
    track: TrackMeta;
}
export interface HealthResponse {
    status: "ok";
}
