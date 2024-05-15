'use server';

import { revalidatePath } from 'next/cache';
import { Product } from '../model/Product.model';
import { connectToDB } from '../mongoose';
import { ScrapeAmazonProduct } from '../scraper';
import {
  getAveragePrice,
  getHighestPrice,
  getLowestPrice,
} from '../scraperUtils';

export async function ScrapeAndStoreAmazonProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();

    const scrapedProduct = await ScrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true },
    );

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    throw new Error(`Failed to create/update product ${error}`);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error(`Failed to get all products ${error}`);
  }
}
