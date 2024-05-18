export type PriceHistoryItem = {
  price: number;
};

export type User = {
  email: string;
};

export type Product = {
  _id?: string;
  url: string;
  currencySymbol: string;
  image: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  discountRate: number;
  description: string;
  category: string | undefined;
  isOutOfStock: Boolean;
  users?: User[];
  ratings: string;
  stars: string;
};

export type NotificationType =
  | 'WELCOME'
  | 'CHANGE_OF_STOCK'
  | 'LOWEST_PRICE'
  | 'THRESHOLD_MET';

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
};
