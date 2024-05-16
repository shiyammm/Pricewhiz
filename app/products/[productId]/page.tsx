import { TrackProduct } from '@/components/TrackProduct';
import { getSingleProduct } from '@/lib/action';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: { productId: string };
};

const page = async ({ params: { productId } }: Props) => {
  const product = await getSingleProduct(productId);

  if (!product) redirect('/');

  return (
    <main className="flex items-center min-h-screen justify-center py-10 lg:py-0 px-2">
      <div className=" rounded-lg flex flex-col gap-5 max-w-lg lg:max-w-6xl lg:flex-row w-full h-full lg:h-[37rem] shadow-md dark:shadow-white/5 shadow-black/40">
        <div className="bg-white lg:w-1/2 flex items-center justify-center rounded-lg">
          <Image
            src={product.image}
            width={300}
            height={300}
            alt={product.title}
            className="overflow-hidden"
          />
        </div>
        <div className=" space-y-2 lg:space-y-4 px-5 pb-5 lg:py-3 lg:w-1/2">
          <h1 className="text-md lg:text-xl font-bold leading-8">
            {product.title}
          </h1>
          <p className="product-category space-x-3">
            <span className="font-semibold text-md lg:text-xl">Category:</span>
            <span className="text-md lg:text-xl">{product.category}</span>
          </p>
          <p className="product-ratings space-x-3">
            <span className="font-semibold text-md lg:text-xl">Ratings:</span>
            <span className="text-md lg:text-xl">{product.ratings}</span>
          </p>
          <p className="product-star space-x-3">
            <span className="font-semibold text-md lg:text-xl">Stars:</span>
            <span className="text-md lg:text-xl">{product.stars}</span>
          </p>
          <p className="product-availability space-x-3">
            <span className="font-semibold text-md lg:text-xl">
              Availability:
            </span>
            <span className="text-md lg:text-xl">
              {product.outOfStock ? 'Out of Stock' : 'In Stock'}
            </span>
          </p>
          <br className="" />
          <br className="hidden lg:block" />
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-5 w-full">
              <div className="bg-secondary rounded-md px-1 text-center py-2">
                <div className="grid">
                  <span className="text-md font-semibold lg:font-bold lg:text-lg">
                    Current Price
                  </span>
                  <span>
                    {product.currencySymbol}
                    {product.currentPrice}
                  </span>
                </div>
              </div>
              <div className="bg-secondary rounded-md px-1 text-center py-2">
                <div className="product-original-price grid">
                  <span className="text-md font-semibold lg:font-bold lg:text-lg">
                    Original Price
                  </span>
                  <span>
                    {product.currencySymbol}
                    {product.originalPrice}
                  </span>
                </div>
              </div>

              <div className="bg-secondary rounded-md px-1 text-center py-2">
                <div className="product-discount grid">
                  <span className="text-md font-semibold lg:font-bold lg:text-lg">
                    Average Price
                  </span>
                  <span>
                    {product.currencySymbol}
                    {product.averagePrice}
                  </span>
                </div>
              </div>

              {product.discountRate > 0 && (
                <div className="bg-secondary rounded-md px-1 text-center py-2">
                  <div className="product-discount grid">
                    <span className="text-md font-semibold lg:font-bold lg:text-lg">
                      Discount
                    </span>
                    <span>{product.discountRate}%</span>
                  </div>
                </div>
              )}
            </div>
            <TrackProduct productId={productId} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
