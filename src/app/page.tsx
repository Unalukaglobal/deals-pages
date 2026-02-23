import { getDeals } from "@/lib/api";
import { HomeContent } from "@/components/deals/HomeContent";

export default async function HomePage() {
  const deals = await getDeals();

  return <HomeContent deals={deals} />;
}
