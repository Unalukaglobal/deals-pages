const STORAGE_KEY = "deal_user";

export interface DealUser {
  name: string;
  email: string;
  createdAt: string;
}

export function signUp(name: string, email: string): DealUser {
  const user: DealUser = { name, email, createdAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function getUser(): DealUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function signOut(): void {
  localStorage.removeItem(STORAGE_KEY);
}
