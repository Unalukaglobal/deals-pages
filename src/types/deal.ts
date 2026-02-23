export interface Deal {
  logId: string;
  productName: string;
  productUrl: string;
  amazonLink: string;
  priceProLocal: string;
  priceProUsd: string;
  screenshotUrl: string;
  images: string[];
  status: string;
  step: string;
  createdAt: string;
  category?: string;
}

export interface DealCardData {
  id: string;
  title: string;
  productUrl: string;
  amazonLink: string;
  priceLocal: number;
  priceUsd: number;
  imageUrl: string;
  images: string[];
  createdAt: Date;
  category: string;
}

export type SortOption = "recent" | "price-low" | "price-high" | "discount";
