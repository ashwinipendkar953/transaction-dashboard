// routes/api.js
const express = require("express");
const router = express.Router();
const {
  initializeDatabase,
  listTransactions,
} = require("../controllers/productController");

const { fetchStatistics } = require("../controllers/statisticsController");
const { fetchBarChartData } = require("../controllers/barChartController");
const { fetchPieChartData } = require("../controllers/pieChartController");

router.post("/initialize-database", initializeDatabase);
router.get("/transactions", listTransactions);
router.get("/statistics", fetchStatistics);
router.get("/bar-chart", fetchBarChartData);
router.get("/pie-chart", fetchPieChartData);

module.exports = router;
