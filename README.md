# Vendor Dashboard Backend Documentation

## Project Overview

The **Vendor Dashboard Backend** is a Node.js and MongoDB-based API that serves as the backend for the Vendor Management system. It provides endpoints to manage and analyze vendor data, including sales data and product information. MongoDB Atlas is used as the cloud database.

### Key Features
- **Vendor Management**: APIs to search, retrieve, and manage vendor information.
- **Sales Analytics**: Detailed analytics for vendor sales, including monthly performance and product-level data.
- **Modular Architecture**: Routes, controllers, and database configurations are organized for clarity.

---

## Project Setup and Installation

### Prerequisites

- **Node.js** and **npm** installed on your system.
- A **MongoDB Atlas** cluster with the connection string.

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd vendor_dashboard
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the project root.
   - Add the following variables:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     PORT=5000
     ```
   - Replace `<your-mongodb-connection-string>` with your MongoDB Atlas connection string.

4. **Start the Server:**
   ```bash
   node server.js
   ```
   - The backend will start running on `http://localhost:5000`.

---

## Project Structure

```plaintext
root/
├── config/
│   └── db.js               # MongoDB connection setup
├── controllers/
│   ├── ordersController.js # Orders database operations
│   └── vendorsController.js# Vendors database operations
├── routes/
│   ├── index.js            # Entry point for all routes
│   ├── orders.js           # Routes for orders APIs
│   └── vendors.js          # Routes for vendors APIs
├── .env                   
├── server.js              
└── package.json         
```

---

## Key Collections in MongoDB


### 1. `vendors`
- Information about vendors.
- **Example Fields**:
  - `_id`
  - `name`: Vendor name.

### 2. `orders`
- Information about customer orders.
- **Example Fields**:
  - `_id`
  - `cart_item`: Array of products in the order with details:
    - `product`: Product ID.
    - `quantity`: Ordered items count.
    - `cogs`: Sold item price.
    - `price`: Selling price.
  - `payment_at`: Payment time.

### 3. `parent_products`
- **Example Fields**:
  - `_id`
  - `name`: Product name
  - `vendor`: Vendor id

---

## Key API Endpoints

### Vendor APIs
- **`GET api/vendors`**
- **`POST api/vendors/search`**
- **`POST api/vendors/sales`**
- **`POST api/vendors/product-sales`**

### Order APIs
- **`POST /orders`**
---
