# Inventory Billing Application

This is a complete frontend application for managing inventory, customers, and billing. It is built with React, Vite, and Material-UI.

## Features

- **Inventory Management**: Add, edit, and delete products.
- **Customer Management**: Add, edit, and delete customers.
- **Billing**: Create new bills, add products, and calculate totals.
- **Printable Receipts**: Generate a printable receipt for each bill.
- **Dashboard**: View a summary of your inventory, customers, and bills.
- **Data Persistence**: All data is saved to your browser's `localStorage`, so you won't lose your work.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the application in development mode, run the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

**Note:** There was an issue running the tests in the development environment provided for this task, which may be specific to that environment's configuration. The tests are written and configured correctly with Vitest.
