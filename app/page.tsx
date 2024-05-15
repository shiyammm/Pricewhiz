import Header from '@/components/Header';
import PriceWhiz from '@/components/PriceWhiz';
import TrendingProducts from '@/components/TrendingProducts';

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <PriceWhiz />
      <TrendingProducts />
    </div>
  );
}
