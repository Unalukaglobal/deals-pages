"use client";

import { useState, useEffect } from "react";
import { DealCardData } from "@/types/deal";
import { getLikes } from "@/lib/likes";
import { getCommentCount } from "@/lib/comments";
import { formatPricePEN } from "@/lib/utils";
import { Flame, ThumbsUp, MessageCircle } from "lucide-react";

interface PopularDealsProps {
  deals: DealCardData[];
  onSelect: (deal: DealCardData) => void;
}

export function PopularDeals({ deals, onSelect }: PopularDealsProps) {
  const [sorted, setSorted] = useState<DealCardData[]>([]);

  useEffect(() => {
    const withLikes = deals.map((d) => ({
      deal: d,
      likes: getLikes(d.id),
      comments: getCommentCount(d.id),
    }));
    withLikes.sort((a, b) => b.likes - a.likes || b.comments - a.comments);
    setSorted(withLikes.slice(0, 8).map((w) => w.deal));
  }, [deals]);

  if (sorted.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
        <Flame className="h-4 w-4 text-deal-orange" />
        Popular Deals
      </h3>
      <div className="flex flex-col gap-2">
        {sorted.map((deal) => (
          <button
            key={deal.id}
            onClick={() => onSelect(deal)}
            className="flex flex-col gap-1 rounded-md p-2 text-left transition-colors hover:bg-accent"
          >
            <span className="line-clamp-2 text-xs font-medium text-foreground">
              {deal.title}
            </span>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-semibold text-deal-blue">
                {formatPricePEN(deal.priceLocal)}
              </span>
              <span className="flex items-center gap-0.5">
                <ThumbsUp className="h-3 w-3" /> {getLikes(deal.id)}
              </span>
              <span className="flex items-center gap-0.5">
                <MessageCircle className="h-3 w-3" /> {getCommentCount(deal.id)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
