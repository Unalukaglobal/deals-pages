import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DealBadgeProps {
  type: "new" | "hot" | "discount";
  value?: string;
  className?: string;
}

export function DealBadge({ type, value, className }: DealBadgeProps) {
  if (type === "new") {
    return (
      <Badge className={cn("bg-deal-blue text-white hover:bg-deal-blue/90", className)}>
        Nuevo
      </Badge>
    );
  }

  if (type === "hot") {
    return (
      <Badge className={cn("bg-deal-orange text-white hover:bg-deal-orange/90", className)}>
        Super Hot!
      </Badge>
    );
  }

  if (type === "discount" && value) {
    return (
      <Badge className={cn("bg-deal-green text-white hover:bg-deal-green/90", className)}>
        {value}% OFF
      </Badge>
    );
  }

  return null;
}
