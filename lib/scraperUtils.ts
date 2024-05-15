type PriceList = {
  price: number;
};

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
