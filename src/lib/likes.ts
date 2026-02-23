import { getUser } from "./auth";

const STORAGE_KEY = "deal_likes";

function getLikesMap(): Record<string, string[]> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveLikesMap(map: Record<string, string[]>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function toggleLike(dealId: string): boolean {
  const user = getUser();
  if (!user) return false;

  const map = getLikesMap();
  const likes = map[dealId] || [];
  const idx = likes.indexOf(user.email);

  if (idx >= 0) {
    likes.splice(idx, 1);
  } else {
    likes.push(user.email);
  }

  map[dealId] = likes;
  saveLikesMap(map);
  return idx < 0; // returns true if liked, false if unliked
}

export function getLikes(dealId: string): number {
  const map = getLikesMap();
  return (map[dealId] || []).length;
}

export function isLiked(dealId: string): boolean {
  const user = getUser();
  if (!user) return false;
  const map = getLikesMap();
  return (map[dealId] || []).includes(user.email);
}
