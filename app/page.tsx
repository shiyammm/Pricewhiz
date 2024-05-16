import PriceWhiz from '@/components/PriceWhiz';
import TrendingProducts from '@/components/TrendingProducts';

export default function Home() {
  return (
    <div className="relative">
      <div className="px-4">
        <PriceWhiz />
        <TrendingProducts />
      </div>
    </div>
  );
}
