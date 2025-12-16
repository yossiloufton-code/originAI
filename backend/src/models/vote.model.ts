export type VoteType = 'LIKE' | 'DISLIKE';

export interface VoteRow {
  id: string;
  image_id: string;
  type: VoteType;
  created_at: Date;
}
