import React from 'react';
import { ModeToggle } from './ui/ModeToggle';

const Header = () => {
  return (
    <header className="flex justify-between items-center absolute w-full p-4 md:px-7 md:py-7">
      <nav>
        <span className="text-xl font-bold lg:text-2xl ">Price Whiz</span>
      </nav>
      <div>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
