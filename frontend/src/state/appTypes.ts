import type { ImageItem, VoteType } from "../api/api";

export type Counts = Record<string, { likes: number; dislikes: number }>;

export type AppState = {
  images: ImageItem[];
  counts: Counts;
  loading: boolean;
  error: string | null;
  voting: Record<string, boolean>; // per image voting flag
};

export type AppAction =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: { images: ImageItem[] } }
  | { type: "LOAD_ERROR"; payload: { error: string } }
  | { type: "SET_COUNTS"; payload: { counts: Counts } }
  | { type: "VOTE_START"; payload: { imageId: string } }
  | {
      type: "VOTE_OPTIMISTIC";
      payload: { imageId: string; voteType: VoteType };
    }
  | { type: "VOTE_END"; payload: { imageId: string } }
  | { type: "VOTE_ERROR"; payload: { imageId: string; error: string } };
