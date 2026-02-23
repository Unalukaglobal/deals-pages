"use client";

import Image from "next/image";
import { DealCardData } from "@/types/deal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DealBadge } from "./DealBadge";
import { PriceDisplay } from "./PriceDisplay";
import { DealActions } from "./DealActions";
import { DealInfoLinks } from "./DealInfoLinks";
import { isNewDeal, timeAgo } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface DealCardProps {
  deal: DealCardData;
  onSelect: (deal: DealCardData) => void;
}

export function DealCard({ deal, onSelect }: DealCardProps) {
  const isNew = isNewDeal(deal.createdAt);

  return (
    <Card
      className="group cursor-pointer overflow-hidden border border-border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
      onClick={() => onSelect(deal)}
    >
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-white">
          {deal.imageUrl ? (
            <Image
              src={deal.imageUrl}
              alt={deal.title}
              fill
              className="object-contain p-3 transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
              Sin imagen
            </div>
          )}

          {/* Badges overlay */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {isNew && <DealBadge type="new" />}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-3">
          <PriceDisplay priceLocal={deal.priceLocal} priceUsd={deal.priceUsd} />

          <h3 className="line-clamp-3 h-[3.375rem] text-sm font-medium leading-[1.125rem] text-foreground">
            {deal.title}
          </h3>

          {/* Quick links */}
          <DealInfoLinks deal={deal} compact />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Unaluka.com</span>
            <span>{timeAgo(deal.createdAt)}</span>
          </div>

          {/* Actions bar */}
          <div className="border-t border-border pt-2">
            <DealActions dealId={deal.id} compact />
          </div>

          <Button
            size="sm"
            className="mt-1 w-full bg-deal-red text-white hover:bg-deal-red-hover"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(deal);
            }}
          >
            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
            Ver Deal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
