import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = "http://localhost:5000/api";

export const fetchTransactions = createAsyncThunk(
  "products/fetchTransactions",
  async ({ month, search, page, perPage }) => {
    const response = await axios.get(`${apiUrl}/transactions`, {
      params: { month, search, page, perPage },
    });
    return response.data;
  }
);

export const fetchStatistics = createAsyncThunk(
  "products/fetchStatistics",
  async (params) => {
    const response = await axios.get(`${apiUrl}/statistics`, { params });
    return response.data;
  }
);

export const fetchBarChartData = createAsyncThunk(
  "products/fetchBarChartData",
  async (params) => {
    const response = await axios.get(`${apiUrl}/bar-chart`, { params });
    return response.data;
  }
);

export const fetchPieChartData = createAsyncThunk(
  "products/fetchPieChartData",
  async (params) => {
    const response = await axios.get(`${apiUrl}/pie-chart`, { params });
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    transactions: [],
    count: null,
    page: null,
    perPage: 10,
    statistics: { totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 },
    barChartData: [],
    pieChartData: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload.transactions;
        state.count = action.payload?.count;
        state.page = action.payload?.page;
        state.perPage = action.payload?.perPage;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchStatistics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statistics.totalSoldItems = action.payload.totalSoldItems;
        state.statistics.totalSaleAmount = action.payload.totalSaleAmount;
        state.statistics.totalNotSoldItems = action.payload.totalNotSoldItems;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBarChartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBarChartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.barChartData = action.payload;
      })
      .addCase(fetchBarChartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPieChartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPieChartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pieChartData = action.payload;
      })
      .addCase(fetchPieChartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
