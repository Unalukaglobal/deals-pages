"use client";

import { useState } from "react";
import { DealCardData } from "@/types/deal";
import { DealGrid } from "./DealGrid";
import { PopularDeals } from "./PopularDeals";
import { DealModal } from "./DealModal";

interface HomeContentProps {
  deals: DealCardData[];
}

export function HomeContent({ deals }: HomeContentProps) {
  const [sidebarDeal, setSidebarDeal] = useState<DealCardData | null>(null);

  return (
    <div>
      {/* Two-column layout */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            Discover
          </h2>
          <a
            href="/deals"
            className="text-sm text-deal-red transition-colors hover:text-deal-red-hover"
          >
            Ver todos &rarr;
          </a>
        </div>

        <div className="flex gap-6">
          {/* Main content - deals grid */}
          <div className="min-w-0 flex-1">
            <DealGrid deals={deals} showViewToggle />
          </div>

          {/* Sidebar - popular deals */}
          <div className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-36">
              <PopularDeals deals={deals} onSelect={setSidebarDeal} />
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer banner */}
      <section className="border-t border-border bg-muted/30 px-4 py-6 text-center">
        <p className="mx-auto max-w-2xl text-xs text-muted-foreground">
          Los precios pueden cambiar sin previo aviso. Unaluka Deals puede ganar una
          comision por las compras realizadas a traves de nuestros enlaces.
          Los precios incluyen costos de importacion y envio a Peru.
        </p>
      </section>

      {/* Modal for sidebar clicks */}
      <DealModal
        deal={sidebarDeal}
        open={!!sidebarDeal}
        onClose={() => setSidebarDeal(null)}
      />
    </div>
  );
}
