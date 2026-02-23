import { DealCardData } from "@/types/deal";
import { seedDeals } from "@/data/deals";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://104.248.208.211:30003";

interface ApiDeal {
  logId: string;
  productName: string;
  productUrl: string;
  amazonLink: string;
  priceProLocal: string;
  priceProUsd: string;
  supplierPriceUsd?: string;
  screenshotUrl: string | null;
  images: string[];
  createdAt: string;
}

function assignCategory(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("drone") || lower.includes("camera") || lower.includes("vlog") || lower.includes("body cam"))
    return "Tecnologia";
  if (lower.includes("creatine") || lower.includes("workout") || lower.includes("sport"))
    return "Deportes";
  if (lower.includes("watch")) return "Accesorios";
  if (lower.includes("controller") || lower.includes("gamepad") || lower.includes("gaming") || lower.includes("game"))
    return "Gaming";
  if (lower.includes("earbuds") || lower.includes("headphone") || lower.includes("audio"))
    return "Audio";
  return "Otros";
}

function mapApiDeal(d: ApiDeal): DealCardData {
  // Use first product image from Shopify, fallback to screenshot
  const imageUrl = (d.images && d.images.length > 0) ? d.images[0] : (d.screenshotUrl || "");

  return {
    id: d.logId,
    title: d.productName.length > 80 ? d.productName.slice(0, 80) + "..." : d.productName,
    productUrl: d.productUrl,
    amazonLink: d.amazonLink,
    priceLocal: parseFloat(d.priceProLocal),
    priceUsd: parseFloat(d.priceProUsd),
    imageUrl,
    images: d.images || [],
    createdAt: new Date(d.createdAt),
    category: assignCategory(d.productName),
  };
}

export async function getDeals(): Promise<DealCardData[]> {
  try {
    const res = await fetch(`${API_URL}/business/agent-deals/public-deals`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("API error");
    const data: ApiDeal[] = await res.json();

    const deals = data.map(mapApiDeal);

    // Deduplicate by title (keep newest)
    const seen = new Map<string, DealCardData>();
    for (const deal of deals) {
      const key = deal.title;
      if (!seen.has(key) || deal.createdAt > seen.get(key)!.createdAt) {
        seen.set(key, deal);
      }
    }

    const unique = Array.from(seen.values());
    return unique.length > 0 ? unique : seedDeals;
  } catch {
    return seedDeals;
  }
}

export function getDealById(deals: DealCardData[], id: string): DealCardData | undefined {
  return deals.find((d) => d.id === id);
}
