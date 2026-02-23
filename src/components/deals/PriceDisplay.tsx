import { formatPricePEN, formatPriceUSD } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  priceLocal: number;
  priceUsd: number;
  size?: "sm" | "lg";
  className?: string;
}

export function PriceDisplay({ priceLocal, priceUsd, size = "sm", className }: PriceDisplayProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "font-bold text-deal-blue",
          size === "lg" ? "text-3xl" : "text-xl"
        )}
      >
        {formatPricePEN(priceLocal)}
      </span>
      <span className={cn("text-muted-foreground", size === "lg" ? "text-sm" : "text-xs")}>
        {formatPriceUSD(priceUsd)} USD
      </span>
    </div>
  );
}
