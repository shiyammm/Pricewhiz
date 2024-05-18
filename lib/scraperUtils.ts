import { Product } from './types';

type PriceList = {
  price: number;
};

const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
};

const THRESHOLD_PERCENTAGE = 40;

export function extractDescription($: any) {
  const elements = $('#feature-bullets .a-unordered-list .a-spacing-mini span');
  if (elements.length > 0) {
    const textContent = elements
      .map((_: any, element: any) => $(element).text().trim())
      .get()
      .join('\n');
    return textContent;
  }
  return '';
}

export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();
    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, '');

      let firstPrice;

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      }
      return firstPrice || cleanPrice;
    }
  }
  return '';
}

export function extractDiscount(discount: any) {
  const element = discount.text().trim().replace(/[-%]/g, '');
  return element;
}

export function getLowestPrice(priceList: PriceList[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }
  return lowestPrice.price;
}
export function getHighestPrice(priceList: PriceList[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }
  return highestPrice.price;
}
export function getAveragePrice(priceList: PriceList[]) {
  let sumOfPrice = priceList.reduce((acc, curr) => acc + curr.price, 0);

  let averagePrice = sumOfPrice / priceList.length || 0;

  return averagePrice;
}

export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product,
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET as keyof typeof Notification;
  }

  return null;
};
