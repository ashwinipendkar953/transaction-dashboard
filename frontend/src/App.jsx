import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStatistics,
  fetchTransactions,
  setPage,
} from "./features/products/productSlice";
import TransactionTable from "./components/TransactionTable";
import Statistics from "./components/Statistics";
import BarChartComponent from "./components/BarChart";
import PieChartComponent from "./components/PieChart";

const App = () => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState("March");
  const [search, setSearch] = useState("");
  const { transactions, status, count, page, perPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchTransactions({ month, search, page, perPage }));
    dispatch(fetchStatistics({ month }));
  }, [dispatch, month, search, page, perPage]);

  const handleChange = (e) => setSearch(e.target.value);

  const handlePageChange = (newPage) => dispatch(setPage(newPage));

  const totalPages = Math.ceil(count / perPage);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Transactions Dashboard</h1>

      <div className="d-lg-flex justify-content-between align-items-center mb-4">
        {/* Search Input */}
        <div className="form-group mb-lg-0 mb-4">
          <input
            type="text"
            className="form-control rounded-pill "
            placeholder="Search Transaction"
            aria-label="Search Transaction"
            onChange={handleChange}
          />
        </div>

        {/* Month Selection */}
        <div
          className="input-group d-flex justify-content-between align-items-center "
          style={{ maxWidth: "300px" }}
        >
          <label className="input-group-text">Select Month</label>
          <select
            className="form-select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Transactions or Status Message */}
      {status === "loading" ? (
        <div className="text-center mt-4">
          <span
            className="spinner-border text-primary"
            role="status"
            aria-hidden="true"
          ></span>
          <p className="mt-2">Loading transactions...</p>
        </div>
      ) : (
        <TransactionTable
          transactions={transactions}
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}

      <Statistics month={month} />
      <BarChartComponent month={month} />
      <PieChartComponent month={month} />
    </div>
  );
};

export default App;
