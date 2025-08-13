const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');


const sampleProducts = [
  {
    name: 'Eco Bamboo Toothbrush',
    image: '/products/bamboo-toothbrush.jpg', // 👈 web path
    description: 'A biodegradable toothbrush made from sustainable bamboo.',
    price: 3.99,
    category: 'Personal Care',
    inStock: true
  },
  {
    name: 'Reusable Grocery Bag',
    image: '/products/grocery-bag.jpg', // 👈 web path
    description: 'Durable and washable grocery bag made from recycled materials.',
    price: 2.5,
    category: 'Household',
    inStock: true
  },
  {
    name: 'Organic Cotton T-Shirt',
    image: '/products/organic-tshirt.jpg', // 👈 web path
    description: 'T-shirt made from 100% organic cotton, chemical-free.',
    price: 15.0,
    category: 'Clothing',
    inStock: true
  },
  {
    name: 'Stainless Steel Water Bottle',
    image: '/products/steel-bottle.jpg', // 👈 web path
    description: 'Eco-friendly reusable bottle to replace single-use plastic.',
    price: 12.0,
    category: 'Accessories',
    inStock: true
  },
  {
    name: 'Solar Powered Garden Lights',
    image: '/products/solar-garden-lights.jpg', // 👈 web path
    description: 'Energy-saving outdoor lights powered by sunlight.',
    price: 25.0,
    category: 'Outdoor',
    inStock: true
  }
];

(async () => {
  try {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI missing in .env');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);

    console.log('Sample products inserted successfully ✅');
  } catch (err) {
    console.error('Error connecting or inserting products:', err.message);
  } finally {
    await mongoose.disconnect();
  }
})();