import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBarChartData } from "../features/products/productSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ month }) => {
  const dispatch = useDispatch();
  const { barChartData, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchBarChartData({ month }));
  }, [dispatch, month]);

  if (status === "loading") return <p>Loading bar chart...</p>;

  const maxItemCount = Math.max(...barChartData.map((item) => item.itemCount));

  const ticks = Array.from(
    { length: Math.ceil(maxItemCount) + 1 },
    (_, index) => index
  );

  return (
    <div className="mt-5">
      <div style={{ width: "100%", height: 400 }}>
        <h3>Bar Chart Stats - {month}</h3>
        <ResponsiveContainer>
          <BarChart
            data={barChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="priceRange"
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis ticks={ticks} />
            <Tooltip />
            <Bar dataKey="itemCount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
