const STORAGE_KEY = "deal_clicks";

function getClickMap(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function trackClick(dealId: string): void {
  const map = getClickMap();
  map[dealId] = (map[dealId] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function getClicks(dealId: string): number {
  return getClickMap()[dealId] || 0;
}
