import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPricePEN(price: number): string {
  return `S/${price.toFixed(2).replace(/\.00$/, "")}`;
}

export function formatPriceUSD(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function calcDiscount(priceLocal: number, priceUsd: number, exchangeRate = 3.38): number {
  const equivalentLocal = priceUsd * exchangeRate;
  if (equivalentLocal <= 0) return 0;
  const discount = ((equivalentLocal - priceLocal) / equivalentLocal) * 100;
  return Math.max(0, Math.round(discount));
}

export function isNewDeal(createdAt: Date): boolean {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  return diff < 24 * 60 * 60 * 1000;
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} dias`;
  return date.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" });
}
