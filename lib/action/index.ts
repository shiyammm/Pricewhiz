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
import { User } from '../types';

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
    const products = await Product.find().sort({ createdAt: -1 }).limit(12);
    return products;
  } catch (error) {
    throw new Error(`Failed to get all products ${error}`);
  }
}

export async function getSingleProduct(_id: string) {
  try {
    connectToDB();
    const product = await Product.findById({ _id });
    return product;
  } catch (error) {
    throw new Error(`Failed to get product ${error}`);
  }
}

export async function addUserEmail(_id: string, userEmail: string) {
  try {
    connectToDB();

    const product = await Product.findById({ _id });

    const existingUser = await product.users.some(
      (user: User) => user.email === userEmail,
    );

    if (!existingUser) {
      product.users.push({ email: userEmail });
      await product.save();
    }
  } catch (error) {}
}
