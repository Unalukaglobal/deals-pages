import { getDeals } from "@/lib/api";
import { DealGrid } from "@/components/deals/DealGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todos los Deals",
  description:
    "Explora todas las ofertas disponibles en Unaluka Deals. Filtra por categoria, ordena por precio y encuentra el deal perfecto.",
};

interface DealsPageProps {
  searchParams: Promise<{ cat?: string; q?: string }>;
}

export default async function DealsPage({ searchParams }: DealsPageProps) {
  const deals = await getDeals();
  const params = await searchParams;
  const category = params.cat || "todos";
  const search = params.q || "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {search
            ? `Resultados para "${search}"`
            : category !== "todos"
              ? `Deals de ${category.charAt(0).toUpperCase() + category.slice(1)}`
              : "Todos los Deals"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {deals.length} ofertas disponibles
        </p>
      </div>

      <DealGrid
        deals={deals}
        showFilters
        showViewToggle
        initialCategory={category}
        initialSearch={search}
      />
    </div>
  );
}
