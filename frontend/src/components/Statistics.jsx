import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "../features/products/productSlice";

const Statistics = ({ month }) => {
  const dispatch = useDispatch();
  const { statistics, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchStatistics({ month }));
  }, [dispatch, month]);

  if (status === "loading") return <p>Loading statistics...</p>;

  return (
    <div className="mt-5">
      <h2>Statistics - {month}</h2>
      <div className="card bg-info-subtle" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <span>Total Sale Amount </span>
            <span>{statistics.totalSaleAmount}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span>Sold Items</span> <span>{statistics.totalSoldItems}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span>Not Sold Items</span>{" "}
            <span>{statistics.totalNotSoldItems}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
