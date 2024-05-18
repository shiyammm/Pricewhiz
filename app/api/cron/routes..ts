import { Product } from '@/lib/model/Product.model';
import { connectToDB } from '@/lib/mongoose';
import { generateEmailContent, sendEmail } from '@/lib/nodemailer';
import { ScrapeAmazonProduct } from '@/lib/scraper';
import {
  getAveragePrice,
  getEmailNotifType,
  getHighestPrice,
  getLowestPrice,
} from '@/lib/scraperUtils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    connectToDB();

    const products = await Product.find({});

    if (!products) console.log('Product not found');

    // Scrape the latest product

    const updatedProducts: any[] = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapedProduct = await ScrapeAmazonProduct(currentProduct.url);

        if (!scrapedProduct) return;

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        const updatedProduct = await Product.findOneAndUpdate({
          url: product.url,
          product,
        });

        const emailNotificationType = getEmailNotifType(
          scrapedProduct,
          currentProduct,
        );

        if (emailNotificationType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };

          const emailContent = await generateEmailContent(
            productInfo,
            emailNotificationType,
          );

          const userEmail = updatedProduct.users.map((user: any) => user.email);

          await sendEmail(emailContent, userEmail);
        }
        return updatedProducts;
      }),
    );

    return NextResponse.json({
      message: 'Ok',
      data: updatedProducts,
    });
  } catch (error) {
    throw new Error('No products found');
  }
}
