const axios = require("axios");
const Product = require("../models/Product");

// Initialize Database
const initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    await Product.insertMany(response.data);
    res.status(200).json({ message: "Database initialized successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Updated monthMapping for zero-based indexing
const monthMapping = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const listTransactions = async (req, res) => {
  const { month: monthName, search, page = 1, perPage = 10 } = req.query;
  const filter = {};

  const month = monthMapping[monthName];

  try {
    // Fetch all products first
    let products = await Product.find(filter);

    // If month is provided, filter by month
    if (month !== undefined) {
      products = products.filter((product) => {
        const productMonth = product.dateOfSale.getMonth() + 1;
        return productMonth === month;
      });
    }

    // Handle search filter (if search is provided)
    if (search) {
      const searchRegex = new RegExp(search, "i");
      products = products.filter((product) => {
        return (
          product.title.match(searchRegex) ||
          product.description.match(searchRegex) ||
          (product.price && product.price.toString().match(searchRegex))
        );
      });
    }

    // Paginate the filtered results
    const startIndex = (page - 1) * perPage;
    const paginatedProducts = products.slice(startIndex, startIndex + perPage);

    // Send the filtered and paginated response
    res.status(200).json({
      transactions: paginatedProducts,
      count: products.length,
      page: parseInt(page),
      perPage: parseInt(perPage),
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  initializeDatabase,
  listTransactions,
};
