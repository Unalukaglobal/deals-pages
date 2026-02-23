"use client";

import { useState, useMemo } from "react";
import { DealCardData, SortOption } from "@/types/deal";
import { DealCard } from "./DealCard";
import { DealExpandedCard } from "./DealExpandedCard";
import { DealModal } from "./DealModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/deals";
import { LayoutGrid, List } from "lucide-react";

type ViewMode = "grid" | "expanded";

interface DealGridProps {
  deals: DealCardData[];
  showFilters?: boolean;
  showViewToggle?: boolean;
  initialCategory?: string;
  initialSearch?: string;
}

export function DealGrid({
  deals,
  showFilters = false,
  showViewToggle = false,
  initialCategory = "todos",
  initialSearch = "",
}: DealGridProps) {
  const [selectedDeal, setSelectedDeal] = useState<DealCardData | null>(null);
  const [sort, setSort] = useState<SortOption>("recent");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    let result = [...deals];

    if (activeCategory !== "todos") {
      result = result.filter(
        (d) => d.category.toLowerCase() === activeCategory
      );
    }

    if (initialSearch) {
      const q = initialSearch.toLowerCase();
      result = result.filter((d) => d.title.toLowerCase().includes(q));
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.priceLocal - b.priceLocal);
        break;
      case "price-high":
        result.sort((a, b) => b.priceLocal - a.priceLocal);
        break;
      case "recent":
      default:
        result.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        break;
    }

    return result;
  }, [deals, activeCategory, sort, initialSearch]);

  return (
    <div>
      {(showFilters || showViewToggle) && (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Category pills */}
          {showFilters ? (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat.slug}
                  variant={activeCategory === cat.slug ? "default" : "secondary"}
                  className="cursor-pointer px-3 py-1 text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setActiveCategory(cat.slug)}
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
          ) : (
            <div />
          )}

          {/* Right: View toggle + Sort */}
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="flex overflow-hidden rounded-md border border-border">
              <Button
                variant="ghost"
                size="icon"
                className={`h-9 w-9 rounded-none ${viewMode === "grid" ? "bg-accent text-foreground" : "text-muted-foreground"}`}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-9 w-9 rounded-none border-l border-border ${viewMode === "expanded" ? "bg-accent text-foreground" : "text-muted-foreground"}`}
                onClick={() => setViewMode("expanded")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {showFilters && (
              <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mas recientes</SelectItem>
                  <SelectItem value="price-low">Menor precio</SelectItem>
                  <SelectItem value="price-high">Mayor precio</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          No se encontraron deals.
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              onSelect={setSelectedDeal}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((deal) => (
            <DealExpandedCard key={deal.id} deal={deal} />
          ))}
        </div>
      )}

      {viewMode === "grid" && (
        <DealModal
          deal={selectedDeal}
          open={!!selectedDeal}
          onClose={() => setSelectedDeal(null)}
        />
      )}
    </div>
  );
}
