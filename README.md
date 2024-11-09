# Transaction Dashboard

This project provides a web-based dashboard that allows users to view and interact with product transaction data. The dashboard includes several features for managing and visualizing transaction information.

## Features

### 1. **Transaction Table**
   - **Filter by Month**: Select a month from January to December to view transactions for that month.
   - **Search Functionality**: Search transactions by title, description, or price.
   - **Pagination**: Navigate through paginated transaction data with options for 10 transactions per page.
   
### 2. **Transaction Statistics**
   - **Total Sale Amount**: Displays the total sale amount for the selected month.
   - **Sold Items Count**: Shows the total number of items sold in the selected month.
   - **Not Sold Items Count**: Shows the total number of items that were not sold in the selected month.

### 3. **Bar Chart**
   - **Price Range Distribution**: Visualizes the distribution of product prices in the selected month, with defined ranges (e.g., 0-100, 101-200, etc.), using Recharts.

### 4. **Pie Chart**
   - **Category Distribution**: Displays the number of items for the selected month, visualized as a pie chart using Recharts.

## Setup Instructions

1. Clone the repository and follow the instructions to set up the backend and frontend.
2. Use the provided features to interact with the transaction data through the transaction table, statistics, and charts.
   
## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Charts**: Recharts for visualizing bar and pie charts
