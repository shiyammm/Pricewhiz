import { getAllProducts } from '@/lib/action';
import React from 'react';
import ProductCard from './ProductCard';

const TrendingProducts = async () => {
  const allProducts = await getAllProducts();

  return (
    <section className=" flex flex-col items-center">
      <h2 className="mb-10 text-2xl font-bold">Trending Products</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
