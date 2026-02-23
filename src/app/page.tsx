import { getDeals } from "@/lib/api";
import { DealGrid } from "@/components/deals/DealGrid";
import { Search } from "lucide-react";

export default async function HomePage() {
  const deals = await getDeals();

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-deal-red/10 to-background px-4 py-16 text-center">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Las mejores ofertas,{" "}
          <span className="text-deal-red">los mejores precios</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Ofertas curadas de tecnologia, gaming, audio y mas.
          Precios en soles peruanos con envio a Peru.
        </p>

        {/* Hero search */}
        <div className="mx-auto mt-8 max-w-md">
          <form action="/deals" method="get" className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              name="q"
              type="text"
              placeholder="Buscar deals... drone, creatine, controller..."
              className="w-full rounded-full border border-border bg-card px-5 py-3 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </form>
        </div>

        {/* Quick tags */}
        <div className="mx-auto mt-4 flex max-w-lg flex-wrap justify-center gap-2">
          {["Tecnologia", "Gaming", "Audio", "Deportes"].map((tag) => (
            <a
              key={tag}
              href={`/deals?cat=${tag.toLowerCase()}`}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {tag}
            </a>
          ))}
        </div>
      </section>

      {/* Deals grid */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            Deals de Hoy
          </h2>
          <a
            href="/deals"
            className="text-sm text-deal-red transition-colors hover:text-deal-red-hover"
          >
            Ver todos &rarr;
          </a>
        </div>

        <DealGrid deals={deals} showViewToggle />
      </section>

      {/* Disclaimer banner */}
      <section className="border-t border-border bg-muted/30 px-4 py-6 text-center">
        <p className="mx-auto max-w-2xl text-xs text-muted-foreground">
          Los precios pueden cambiar sin previo aviso. Unaluka Deals puede ganar una
          comision por las compras realizadas a traves de nuestros enlaces.
          Los precios incluyen costos de importacion y envio a Peru.
        </p>
      </section>
    </div>
  );
}
