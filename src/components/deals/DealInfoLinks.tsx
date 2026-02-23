"use client";

import { DealCardData } from "@/types/deal";
import { formatPricePEN } from "@/lib/utils";
import { Copy, UserRound, Globe, ShoppingCart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINK_ASESORA = "https://ul.pe/ComprarUnalukaDeals";
const LINK_TYC = "https://bit.ly/TyC-Unaluka";

interface DealInfoLinksProps {
  deal: DealCardData;
  compact?: boolean;
}

function buildShareText(deal: DealCardData): string {
  return `${deal.title}\n\nPrecio: ${formatPricePEN(deal.priceLocal)}\n\nCompra con asesora: ${LINK_ASESORA}\n\nCompra WEB: ${deal.productUrl}\n\nLink de Amazon: ${deal.amazonLink}\n\nTerminos y condiciones: ${LINK_TYC}`;
}

export function DealInfoLinks({ deal, compact }: DealInfoLinksProps) {
  const handleCopyInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(buildShareText(deal));
  };

  if (compact) {
    return (
      <div className="flex flex-col gap-1 text-xs" onClick={(e) => e.stopPropagation()}>
        <a href={deal.productUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-deal-blue hover:underline">
          <Globe className="h-3 w-3 shrink-0" /> Compra WEB
        </a>
        <a href={deal.amazonLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-deal-orange hover:underline">
          <ShoppingCart className="h-3 w-3 shrink-0" /> Amazon
        </a>
        <a href={LINK_ASESORA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-deal-green hover:underline">
          <UserRound className="h-3 w-3 shrink-0" /> Asesora
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3" onClick={(e) => e.stopPropagation()}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase text-muted-foreground">Informacion del Deal</span>
        <Button variant="ghost" size="xs" onClick={handleCopyInfo} className="text-xs text-muted-foreground">
          <Copy className="mr-1 h-3 w-3" /> Copiar
        </Button>
      </div>

      <div className="space-y-2 text-sm">
        {/* Precio */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Precio:</span>
          <span className="font-bold text-deal-blue">{formatPricePEN(deal.priceLocal)}</span>
        </div>

        {/* Compra con asesora */}
        <div className="flex items-start gap-2">
          <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-deal-green" />
          <div className="min-w-0">
            <span className="text-muted-foreground">Compra con asesora:</span>
            <a href={LINK_ASESORA} target="_blank" rel="noopener noreferrer" className="ml-1 break-all text-deal-green hover:underline">
              {LINK_ASESORA}
            </a>
          </div>
        </div>

        {/* Compra WEB */}
        <div className="flex items-start gap-2">
          <Globe className="mt-0.5 h-4 w-4 shrink-0 text-deal-blue" />
          <div className="min-w-0">
            <span className="text-muted-foreground">Compra WEB:</span>
            <a href={deal.productUrl} target="_blank" rel="noopener noreferrer" className="ml-1 break-all text-deal-blue hover:underline">
              {deal.productUrl}
            </a>
          </div>
        </div>

        {/* Link de Amazon */}
        <div className="flex items-start gap-2">
          <ShoppingCart className="mt-0.5 h-4 w-4 shrink-0 text-deal-orange" />
          <div className="min-w-0">
            <span className="text-muted-foreground">Link de Amazon:</span>
            <a href={deal.amazonLink} target="_blank" rel="noopener noreferrer" className="ml-1 break-all text-deal-orange hover:underline">
              {deal.amazonLink}
            </a>
          </div>
        </div>

        {/* Términos y condiciones */}
        <div className="flex items-start gap-2">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <span className="text-muted-foreground">Terminos y condiciones:</span>
            <a href={LINK_TYC} target="_blank" rel="noopener noreferrer" className="ml-1 break-all text-muted-foreground hover:text-foreground hover:underline">
              {LINK_TYC}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
