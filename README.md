# Finsight — Finance Dashboard

A clean, interactive finance dashboard built as part of the Zorvyn Frontend Developer Internship assignment.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

To build for production:

```bash
npm run build
npm run preview
```

---

## Tech Stack

| Layer          | Choice              | Reason                                                              |
|----------------|---------------------|---------------------------------------------------------------------|
| Framework      | React 18            | Industry standard, component-based, ecosystem depth                 |
| Styling        | Tailwind CSS v3     | Utility-first — fast iteration, consistent design tokens            |
| State          | Zustand + persist   | Lightweight, zero boilerplate, localStorage persistence out-of-box  |
| Charts         | Recharts            | Composable, responsive, best API quality for React                  |
| Routing        | React Router v6     | Standard SPA navigation                                             |
| Icons          | Lucide React        | Clean, consistent, tree-shakeable                                   |
| Date Handling  | date-fns            | Modular, lightweight alternative to Moment                          |
| Build Tool     | Vite                | Fast HMR, modern ESM bundling                                       |

---

## Features

### Dashboard Overview
- **4 Summary Cards** — Net Balance, Total Income, Total Expenses, Savings Rate
- **Balance Trend** — Area chart showing cumulative net balance across 6 months
- **Spending Breakdown** — Donut chart with per-category percentages and legend

### Transactions
- 60 realistic mock transactions in INR across Oct 2024 — Mar 2025
- **Search** by description or category (live, case-insensitive)
- **Filter** by category, transaction type (income/expense), and date range
- **Sort** by date (newest/oldest) or amount (highest/lowest)
- **Admin:** Add, edit, delete transactions via modal with validation
- **Viewer:** Read-only — all mutation controls are hidden
- Empty state handled gracefully with helpful messaging

### Role-Based UI (RBAC)
- Toggle between **Admin** and **Viewer** via the header dropdown
- Admin sees: Add Transaction button, inline Edit/Delete actions on hover
- Viewer sees: a lock indicator, a contextual notice, and purely read-only data
- Role is persisted across page refreshes via Zustand's persist middleware

### Insights
- 8 computed financial observations including:
  - Top & 2nd highest spending categories
  - Best income month
  - Average monthly expenses
  - Latest month savings rate with health indicator
  - Most frugal month
  - 6-month net savings
  - Month-over-month expense change
- Monthly Comparison bar chart (Income vs Expenses, with net shown in tooltip)

### Bonus Features
- **Dark / Light mode** toggle — persisted across sessions
- **LocalStorage persistence** — transactions, role, and theme survive page refresh
- **Responsive layout** — sidebar hidden on mobile, full layout on desktop
- **Smooth page transitions** — CSS animation on route change
- **INR formatting** — `Intl.NumberFormat` with `en-IN` locale throughout

### Advanced Features
- **Budget Tracker** — Set per-category monthly spending limits with live progress bars. Inline editing for Admin. Color-coded health indicators (green/amber/red).
- **Spending Heatmap** — 6×7 grid visualizing spend intensity by day-of-week across 6 months. Reveals behavioral spending patterns at a glance.
- **Recurring Detection** — Algorithm that normalizes transaction descriptions and auto-detects subscriptions and recurring payments — no manual tagging required.

---

## Project Structure

```
src/
├── data/
│   └── mockData.js              # 60 transactions + chart utility functions
├── store/
│   └── useStore.js              # Zustand store — transactions, role, theme, filters
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx          # Fixed left navigation
│   │   └── Header.jsx           # Top bar — role switcher + theme toggle
│   ├── dashboard/
│   │   └── SummaryCards.jsx     # 4 stat cards
│   ├── charts/
│   │   ├── BalanceTrend.jsx     # Area chart — cumulative balance
│   │   ├── SpendingBreakdown.jsx# Donut chart — expenses by category
│   │   └── MonthlyComparison.jsx# Bar chart — income vs expenses
│   ├── transactions/
│   │   ├── TransactionTable.jsx # Data table with RBAC controls
│   │   ├── TransactionModal.jsx # Add/Edit form with validation
│   │   └── Filters.jsx          # Search, filter, sort, date range
│   └── insights/
│       └── InsightCards.jsx     # 8 computed financial insight cards
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   └── Insights.jsx
├── App.jsx                      # Root — routing + theme sync
├── main.jsx                     # React entry point
└── index.css                    # Tailwind + Google Fonts + scrollbar
```

---

## Design Decisions

**Zustand over Context API**  
With multiple cross-cutting concerns — transactions, theme, role, and filters — Context would require either a monolithic provider or nested providers with prop drilling. Zustand keeps all state in one flat, composable store with no Provider boilerplate. The `persist` middleware adds localStorage sync with one line.

**Computed data as pure functions outside the store**  
`getMonthlySummary`, `getSpendingByCategory`, and `getBalanceTrend` in `mockData.js` are pure functions that take a transactions array and return derived data. This keeps the store lean, makes computations testable in isolation, and avoids stale derived state bugs.

**INR formatting throughout**  
Used `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })` everywhere. Mock data uses realistic Indian salary and expense amounts — this makes the dashboard feel purposeful rather than generic.

**Role simulation via store, not component state**  
The selected role lives in the global Zustand store (and is persisted). This means any component can read the role and conditionally render without prop drilling. In production, this would be replaced with a decoded JWT claim — the component consumption pattern would remain identical.

**Chart data sampling**  
The balance trend chart samples every 3rd data point from 60 transactions to avoid axis crowding while preserving the curve shape. The last point is always included to ensure the final balance is shown accurately.

---

## Assumptions

- Opening balance is ₹0; charts reflect cumulative net cash flow from transactions
- "Savings Rate" is calculated as `(totalIncome - totalExpenses) / totalIncome × 100`
- All state is client-side — no backend or authentication implemented
- Mock data intentionally spans a full 6-month window to make all charts meaningful
