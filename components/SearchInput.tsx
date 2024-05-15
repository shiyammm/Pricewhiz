'use client';
import React, { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrapeAndStoreAmazonProduct } from '@/lib/action';

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const isValid = (url: string) => {
    try {
      const paseUrl = new URL(url);
      const hostname = paseUrl.hostname;

      if (hostname.includes('amazon.com') || hostname.includes('amazon'))
        return true;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidAmazonProductUrl = isValid(searchInput);

    if (!isValidAmazonProductUrl) {
      alert('Please enter valid Amazon Product url');
    }
    try {
      setIsSearching(true);
      const product = await ScrapeAndStoreAmazonProduct(searchInput);
    } catch (error) {
      console.log(error);
      setIsSearching(false);
    }
  };

  return (
    <form
      className="flex w-full max-w-lg items-center space-x-2 mt-8"
      onSubmit={handleSubmit}
    >
      <Input
        type="search"
        placeholder="Paste your amazon product url"
        className="text-md"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Button
        type="submit"
        className="py-5 px-6 text-md"
        disabled={searchInput === ''}
      >
        {isSearching ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
};

export default SearchInput;
