import { getUser } from "./auth";

const STORAGE_KEY = "deal_comments";

export interface DealComment {
  userName: string;
  userEmail: string;
  text: string;
  date: string;
}

function getCommentsMap(): Record<string, DealComment[]> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCommentsMap(map: Record<string, DealComment[]>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function addComment(dealId: string, text: string): DealComment | null {
  const user = getUser();
  if (!user) return null;

  const map = getCommentsMap();
  const comments = map[dealId] || [];
  const comment: DealComment = {
    userName: user.name,
    userEmail: user.email,
    text,
    date: new Date().toISOString(),
  };
  comments.push(comment);
  map[dealId] = comments;
  saveCommentsMap(map);
  return comment;
}

export function getComments(dealId: string): DealComment[] {
  const map = getCommentsMap();
  return map[dealId] || [];
}

export function getCommentCount(dealId: string): number {
  return getComments(dealId).length;
}
