const Product = require("../models/Product");

const fetchStatistics = async (req, res) => {
  try {
    const { month, year } = req.query;

    // Map month names to numbers
    const monthMap = {
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

    // Convert the month name to a number
    const parsedMonth = monthMap[month];

    // Validate the month
    if (!parsedMonth) {
      return res.status(400).json({
        message:
          "Invalid month name. Please use a full month name like 'March'.",
      });
    }

    const products = await Product.find();
    const yearsInData = products.map((product) =>
      new Date(product.dateOfSale).getFullYear()
    );
    const mostRecentYear = Math.max(...yearsInData);

    const parsedYear = parseInt(year, 10) || mostRecentYear;

    const startOfMonth = new Date(parsedYear, parsedMonth - 1, 1);
    const endOfMonth = new Date(parsedYear, parsedMonth, 1);

    const statistics = await Product.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startOfMonth, $lt: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
          totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
          totalNotSoldItems: {
            $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] },
          },
        },
      },
    ]);

    res.json(
      statistics[0] || {
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch statistics" });
  }
};

module.exports = { fetchStatistics };
