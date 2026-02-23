"use client";

import Image from "next/image";
import { DealCardData } from "@/types/deal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DealBadge } from "./DealBadge";
import { formatPricePEN, formatPriceUSD, isNewDeal, timeAgo } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { trackClick } from "@/lib/clicks";

interface DealExpandedCardProps {
  deal: DealCardData;
}

export function DealExpandedCard({ deal }: DealExpandedCardProps) {
  const isNew = isNewDeal(deal.createdAt);

  return (
    <Card className="overflow-hidden border-border bg-card transition-all hover:border-primary/30">
      <div className="flex flex-col sm:flex-row">
        {/* Left: Price + Image */}
        <div className="flex shrink-0 flex-col items-center gap-3 bg-white p-4 sm:w-[220px]">
          <span className="text-2xl font-bold text-deal-blue">
            {formatPricePEN(deal.priceLocal)}
          </span>
          <div className="relative h-[160px] w-[180px]">
            {deal.imageUrl ? (
              <Image
                src={deal.imageUrl}
                alt={deal.title}
                fill
                className="object-contain"
                sizes="180px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                Sin imagen
              </div>
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-1 flex-col justify-between p-4">
          {/* Top: badges + title + description */}
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {isNew && <DealBadge type="new" />}
              <DealBadge type="hot" />
            </div>

            <h3 className="text-base font-bold leading-snug text-foreground sm:text-lg">
              {deal.title}
            </h3>

            {/* Price table inline */}
            <div className="mt-3 space-y-1 text-sm">
              <div className="flex gap-8">
                <span className="text-muted-foreground">Precio</span>
                <span className="font-medium">: {formatPricePEN(deal.priceLocal)}</span>
              </div>
              <div className="flex gap-8">
                <span className="text-muted-foreground">Envio</span>
                <span className="font-medium text-deal-green">: Incluido</span>
              </div>
              <div className="flex gap-8">
                <span className="font-semibold">Precio Final</span>
                <span className="font-bold text-deal-blue">: {formatPricePEN(deal.priceLocal)} + Envio Gratis</span>
              </div>
            </div>

            {/* Compare */}
            <p className="mt-2 text-xs text-muted-foreground">
              En Amazon: {formatPriceUSD(deal.priceUsd)} USD
            </p>
          </div>

          {/* Bottom: store + date + button */}
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <span className="text-xs text-muted-foreground">
              Unaluka.com ({timeAgo(deal.createdAt)})
            </span>
            <a href={`/go/${deal.id}`} target="_blank" rel="noopener noreferrer" onClick={() => trackClick(deal.id)}>
              <Button className="bg-deal-red text-white hover:bg-deal-red-hover">
                <ExternalLink className="mr-2 h-4 w-4" />
                Get Deal
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}
