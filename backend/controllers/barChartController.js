const Product = require("../models/Product");

const priceRanges = [
  { label: "0-100", min: 0, max: 100 },
  { label: "101-200", min: 101, max: 200 },
  { label: "201-300", min: 201, max: 300 },
  { label: "301-400", min: 301, max: 400 },
  { label: "401-500", min: 401, max: 500 },
  { label: "501-600", min: 501, max: 600 },
  { label: "601-700", min: 601, max: 700 },
  { label: "701-800", min: 701, max: 800 },
  { label: "801-900", min: 801, max: 900 },
  { label: "901-above", min: 901, max: Infinity },
];

const getPriceRangeLabel = (price) => {
  for (const range of priceRanges) {
    if (price >= range.min && price <= range.max) {
      return range.label;
    }
  }
  return null;
};

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

const fetchBarChartData = async (req, res) => {
  const { month: monthName } = req.query;
  const month = monthMapping[monthName];

  if (!month) {
    return res.status(400).json({
      error:
        "Invalid month. Please provide a valid month name (e.g., 'March').",
    });
  }

  try {
    const products = await Product.find();

    const filteredProducts = products.filter((product) => {
      const productMonth = product.dateOfSale.getMonth() + 1;
      return productMonth === month;
    });

    const rangeCounts = priceRanges.reduce((acc, range) => {
      acc[range.label] = 0;
      return acc;
    }, {});

    filteredProducts.forEach((product) => {
      const rangeLabel = getPriceRangeLabel(product.price);
      if (rangeLabel) {
        rangeCounts[rangeLabel]++;
      }
    });

    const responseData = Object.keys(rangeCounts).map((label) => ({
      priceRange: label,
      itemCount: rangeCounts[label],
    }));

    res.json(responseData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching products", details: error.message });
  }
};

module.exports = { fetchBarChartData };
