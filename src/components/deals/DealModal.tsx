"use client";

import Image from "next/image";
import { DealCardData } from "@/types/deal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceDisplay } from "./PriceDisplay";
import { DealBadge } from "./DealBadge";
import { formatPricePEN, formatPriceUSD, isNewDeal, timeAgo } from "@/lib/utils";
import { ExternalLink, Copy, Share2, ShoppingCart } from "lucide-react";
import { trackClick } from "@/lib/clicks";
interface DealModalProps {
  deal: DealCardData | null;
  open: boolean;
  onClose: () => void;
}

export function DealModal({ deal, open, onClose }: DealModalProps) {
  if (!deal) return null;

  const isNew = isNewDeal(deal.createdAt);
  const currentImage = deal.imageUrl;

  const handleVerDeal = () => {
    trackClick(deal.id);
    window.open(`/go/${deal.id}`, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(deal.productUrl);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: deal.title,
        text: `${deal.title} - ${formatPricePEN(deal.priceLocal)}`,
        url: deal.productUrl,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-6xl overflow-y-auto border-border bg-card p-0">
        <DialogTitle className="sr-only">{deal.title}</DialogTitle>

        {/* Horizontal layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Left: Image section */}
          <div className="flex shrink-0 items-center justify-center bg-white lg:w-[420px]">
            {/* Main image - centered */}
            <div className="relative aspect-square w-full">
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={deal.title}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 95vw, 420px"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                  Sin imagen
                </div>
              )}
            </div>
          </div>

          {/* Right: Info section */}
          <div className="flex flex-1 flex-col gap-3 p-5 lg:p-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {isNew && <DealBadge type="new" />}
              <DealBadge type="hot" />
              <Badge variant="secondary" className="text-xs">
                {deal.category}
              </Badge>
            </div>

            {/* Price - prominent */}
            <PriceDisplay
              priceLocal={deal.priceLocal}
              priceUsd={deal.priceUsd}
              size="lg"
            />

            {/* Title */}
            <h2 className="text-base font-bold leading-snug text-foreground lg:text-lg">
              {deal.title}
            </h2>

            {/* Price table */}
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Precio</span>
                  <span className="font-medium">{formatPricePEN(deal.priceLocal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envio</span>
                  <span className="font-medium text-deal-green">Incluido</span>
                </div>
                <div className="border-t border-border pt-1.5">
                  <div className="flex justify-between font-semibold">
                    <span>Precio Final</span>
                    <span className="text-deal-blue">{formatPricePEN(deal.priceLocal)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compare with Amazon */}
            <div className="rounded-lg border border-border p-3">
              <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                Comparar precio
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Amazon</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatPriceUSD(deal.priceUsd)} USD
                </span>
              </div>
            </div>

            {/* Store + date */}
            <div className="text-xs text-muted-foreground">
              Unaluka.com &middot; {timeAgo(deal.createdAt)}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-deal-red text-white hover:bg-deal-red-hover"
                size="lg"
                onClick={handleVerDeal}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver Deal
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
