const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export type ImageItem = { id: string; url: string };
export type VoteType = "LIKE" | "DISLIKE";
export type VoteCountsItem = {
  imageId: string;
  likes: number;
  dislikes: number;
};

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || `Request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}

export async function fetchImages(): Promise<ImageItem[]> {
  const data = await http<{ items: ImageItem[] }>("/api/images");
  return data.items;
}

export async function fetchCounts(
  imageIds: string[],
): Promise<VoteCountsItem[]> {
  if (imageIds.length === 0) return [];
  const query = encodeURIComponent(imageIds.join(","));
  const data = await http<{ items: VoteCountsItem[] }>(
    `/api/votes/counts?imageIds=${query}`,
  );
  return data.items;
}

export async function postVote(imageId: string, type: VoteType) {
  return http<{ item: any }>("/api/votes", {
    method: "POST",
    body: JSON.stringify({ imageId, type }),
  });
}

export function downloadVotesCsv() {
  window.location.href = `${API_URL}/api/votes/export`;
}
