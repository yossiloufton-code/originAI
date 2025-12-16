-- Needed for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('LIKE', 'DISLIKE')),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_votes_image_id ON votes(image_id);
CREATE INDEX IF NOT EXISTS idx_votes_created_at ON votes(created_at);
