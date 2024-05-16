import { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const truncatedTitle =
    product.title.length > 50
      ? `${product.title.substring(0, 47)}...`
      : product.title;

  return (
    <Link
      href={`/products/${product._id}`}
      className="max-w-[25rem] sm:max-w-xs shadow-md shadow-slate-900 rounded-lg"
    >
      <div className="p-2">
        <Image
          src={product.image}
          width={400}
          height={400}
          alt={product.title}
          className="rounded-t-lg overflow-hidden"
        />
        <div className="py-5 px-3 space-y-2">
          <h3 className="text-ellipsis font-bold">{truncatedTitle}</h3>
          <div className="flex gap-6">
            <div className="space-x-1">
              <span>{product.currencySymbol}</span>
              <span>{product.currentPrice}</span>
            </div>
            <div className="space-x-1">
              <span className="font-bold">M.R.P :</span>
              <span className="space-x-1">
                <span> {product.currencySymbol}</span>
                <s>{product.originalPrice}</s>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
