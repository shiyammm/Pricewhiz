import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    url: { type: 'String', required: true },
    title: { type: 'String', required: true },
    image: { type: 'String', required: true },
    ratings: { type: 'String', required: true },
    stars: { type: 'String', required: true },
    currentPrice: { type: 'Number', required: true },
    originalPrice: { type: 'Number', required: true },
    isOutOfStock: { type: 'Boolean', required: true },
    category: { type: 'String' },
    currencySymbol: { type: 'String' },
    discountRate: { type: 'Number' },
    lowestPrice: { type: 'String' },
    highestPrice: { type: 'String' },
    averagePrice: { type: 'String' },
    priceHistory: [
      {
        price: { type: 'Number', required: true },
        date: { type: 'Date', default: Date.now },
      },
    ],
    users: [
      {
        email: { type: 'string', required: true },
      },
    ],
    default: [],
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.AmazonProduct ||
  mongoose.model('AmazonProduct', ProductSchema, 'productItems');
