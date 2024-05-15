'use server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {
  extractDescription,
  extractDiscount,
  extractPrice,
} from '../scraperUtils';

export async function ScrapeAmazonProduct(url: string) {
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const host = 'brd.superproxy.io';
  const session_id = (100000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    port,
    host,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    const title = $('#productTitle').text().trim();

    const ratings = $('#acrCustomerReviewText').first().text().trim();
    const stars = $('i.cm-cr-review-stars-spacing-big span')
      .first()
      .text()
      .trim();

    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}';

    const imgUrls = Object.keys(JSON.parse(images));

    const currentPrice = extractPrice($('.priceToPay span.a-price-whole'));

    const currencySymbol = $('.priceToPay span.a-price-symbol')
      .first()
      .text()
      .trim();

    const originalPrice = extractPrice(
      $('.a-price.a-text-price span.a-offscreen'),
    );

    const description = extractDescription($);

    const discount = extractDiscount($('.savingsPercentage'));

    const category = $('span.nav-a-content img.nav-categ-image').attr('alt');

    const outOfStock =
      $('#availability span').text().toLowerCase() == 'Currently unavailable';

    const data = {
      url,
      title,
      image: imgUrls[0],
      description,
      discountRate: Number(discount),
      category,
      ratings,
      stars,
      currentPrice,
      currencySymbol: currencySymbol ? currencySymbol : '',
      originalPrice,
      outOfStock,
      priceHistory: [],
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch the product ${error}`);
  }
}
