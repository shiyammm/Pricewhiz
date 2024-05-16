import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Price Whiz',
  description:
    'Welcome to Price Whiz: Your Ultimate Price Tracking and Trending Product Discovery Platform. With Price Whiz, effortlessly monitor product prices, receive timely notifications on price changes directly to your inbox, and explore trending products. Say goodbye to manual price tracking and hello to a smarter shopping experience with Price Whiz!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {' '}
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
