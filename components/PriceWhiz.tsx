import React from 'react';
import SearchInput from '@/components/SearchInput';

const PriceWhiz = () => {
  return (
    <main className="flex items-center justify-center w-full min-h-screen flex-col">
      <div className="text-center space-y-5">
        <h1 className="text-4xl font-bold leading-10 sm:text-5xl sm:leading-[4rem] lg:text-6xl lg:leading-[5rem]">
          Simplify Your Online <br className="hidden sm:block" /> Shopping
          Experience
        </h1>
        <p className="text-sm sm:text-md lg:text-lg">
          Track prices and find trending products effortlessly with Price Whiz.
        </p>
      </div>
      <SearchInput />
    </main>
  );
};

export default PriceWhiz;
