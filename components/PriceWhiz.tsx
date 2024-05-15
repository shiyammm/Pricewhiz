import React from 'react';
import SearchInput from '@/components/SearchInput';

const PriceWhiz = () => {
  return (
    <main className="flex items-center justify-center w-full min-h-screen flex-col">
      <div className="text-center space-y-5">
        <h1 className="text-7xl font-bold leading-[5.5rem]">
          Simplify Your Online <br /> Shopping Experience
        </h1>
        <p className="text-xl">
          Track prices and find trending products effortlessly with Price Whiz.
        </p>
      </div>
      <SearchInput />
    </main>
  );
};

export default PriceWhiz;
