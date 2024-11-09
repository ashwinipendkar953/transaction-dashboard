import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPieChartData } from "../features/products/productSlice";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PieChartComponent = ({ month }) => {
  const dispatch = useDispatch();
  const { pieChartData, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchPieChartData({ month }));
  }, [dispatch, month]);

  if (status === "loading") return <p>Loading pie chart...</p>;

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ff7300",
    "#ff5555",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#C0C0C0",
    "#E0E0E0",
  ];

  return (
    <div className="mt-5">
      <div style={{ width: "100%", height: 400 }}>
        <h3>Bar Chart Stats - {month}</h3>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;
