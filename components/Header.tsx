import React from 'react';
import { ModeToggle } from './ui/ModeToggle';

const Header = () => {
  return (
    <header className="flex justify-between items-center px-10 absolute w-full py-8">
      <nav>
        <span className="text-2xl font-semibold">Price Whiz</span>
      </nav>
      <div>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
