import { NextRequest, NextResponse } from "next/server";
import { seedDeals } from "@/data/deals";
import { getDeals } from "@/lib/api";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ dealId: string }> }
) {
  const { dealId } = await params;

  // Try API first, fallback to seed
  let deals = seedDeals;
  try {
    deals = await getDeals();
  } catch {
    // use seed
  }

  const deal = deals.find((d) => d.id === dealId);

  if (!deal) {
    return NextResponse.redirect(new URL("/", _request.url));
  }

  // TODO: Register click analytics here in the future

  return NextResponse.redirect(deal.productUrl);
}
