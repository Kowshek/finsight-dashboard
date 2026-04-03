// ─── Categories ───────────────────────────────────────────────────────────────

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transport',
  'Shopping',
  'Bills & Utilities',
  'Entertainment',
  'Healthcare',
  'Investment',
];

export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Returns'];

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

const CATEGORY_COLORS = {
  'Food & Dining':   '#F97316',
  'Transport':       '#3B82F6',
  'Shopping':        '#A855F7',
  'Bills & Utilities':'#EF4444',
  'Entertainment':   '#EC4899',
  'Healthcare':      '#14B8A6',
  'Investment':      '#6366F1',
  'Salary':          '#00C896',
  'Freelance':       '#84CC16',
  'Returns':         '#F59E0B',
};

export const getCategoryColor = (cat) => CATEGORY_COLORS[cat] || '#64748B';

// ─── Transactions ──────────────────────────────────────────────────────────────

export const transactions = [
  // ── October 2024 ───────────────────────────────────────────────────────────
  { id: 't001', date: '2024-10-01', description: 'Monthly Salary — Oct',        amount: 85000, category: 'Salary',           type: 'income'  },
  { id: 't002', date: '2024-10-03', description: 'Electricity Bill',             amount:  2340, category: 'Bills & Utilities', type: 'expense' },
  { id: 't003', date: '2024-10-05', description: 'Swiggy — Weekly Order',        amount:   850, category: 'Food & Dining',    type: 'expense' },
  { id: 't004', date: '2024-10-08', description: 'Ola Cab Rides',                amount:   620, category: 'Transport',        type: 'expense' },
  { id: 't005', date: '2024-10-10', description: 'Amazon Shopping',              amount:  3200, category: 'Shopping',         type: 'expense' },
  { id: 't006', date: '2024-10-15', description: 'Freelance — Web Project',      amount: 18000, category: 'Freelance',        type: 'income'  },
  { id: 't007', date: '2024-10-18', description: 'Zomato Dineout',               amount:  1200, category: 'Food & Dining',    type: 'expense' },
  { id: 't008', date: '2024-10-20', description: 'Jio Broadband Bill',           amount:   999, category: 'Bills & Utilities', type: 'expense' },
  { id: 't009', date: '2024-10-23', description: 'BookMyShow — Movie Night',     amount:   680, category: 'Entertainment',    type: 'expense' },
  { id: 't010', date: '2024-10-28', description: 'SIP — Nifty 50 Index Fund',    amount:  5000, category: 'Investment',       type: 'expense' },

  // ── November 2024 ──────────────────────────────────────────────────────────
  { id: 't011', date: '2024-11-01', description: 'Monthly Salary — Nov',        amount: 85000, category: 'Salary',           type: 'income'  },
  { id: 't012', date: '2024-11-02', description: 'Petrol — 2 Wheeler',           amount:  1800, category: 'Transport',        type: 'expense' },
  { id: 't013', date: '2024-11-06', description: 'DMart Grocery Haul',           amount:  4200, category: 'Food & Dining',    type: 'expense' },
  { id: 't014', date: '2024-11-10', description: 'Diwali Shopping — Clothes',    amount: 12000, category: 'Shopping',         type: 'expense' },
  { id: 't015', date: '2024-11-12', description: 'Doctor Visit — GP',            amount:   800, category: 'Healthcare',       type: 'expense' },
  { id: 't016', date: '2024-11-15', description: 'Pharmacy — Medicines',         amount:   450, category: 'Healthcare',       type: 'expense' },
  { id: 't017', date: '2024-11-20', description: 'Netflix + Spotify Subs',       amount:  1147, category: 'Entertainment',    type: 'expense' },
  { id: 't018', date: '2024-11-22', description: 'Freelance — Logo Design',      amount:  8000, category: 'Freelance',        type: 'income'  },
  { id: 't019', date: '2024-11-25', description: 'SIP — Nifty 50 Index Fund',    amount:  5000, category: 'Investment',       type: 'expense' },
  { id: 't020', date: '2024-11-28', description: 'Jio Mobile Recharge',          amount:   599, category: 'Bills & Utilities', type: 'expense' },

  // ── December 2024 ──────────────────────────────────────────────────────────
  { id: 't021', date: '2024-12-01', description: 'Monthly Salary — Dec',        amount: 85000, category: 'Salary',           type: 'income'  },
  { id: 't022', date: '2024-12-02', description: 'Year-End Performance Bonus',   amount: 30000, category: 'Salary',           type: 'income'  },
  { id: 't023', date: '2024-12-05', description: 'Zomato — Week 1',              amount:  1450, category: 'Food & Dining',    type: 'expense' },
  { id: 't024', date: '2024-12-10', description: 'IndiGo — Chennai to Mumbai',   amount:  8200, category: 'Transport',        type: 'expense' },
  { id: 't025', date: '2024-12-12', description: 'Christmas Gifts & Decor',      amount:  6500, category: 'Shopping',         type: 'expense' },
  { id: 't026', date: '2024-12-15', description: 'New Year Eve Party Tickets',   amount:  2800, category: 'Entertainment',    type: 'expense' },
  { id: 't027', date: '2024-12-18', description: 'Cult Fit — Annual Membership', amount: 12000, category: 'Healthcare',       type: 'expense' },
  { id: 't028', date: '2024-12-22', description: 'BigBasket — Grocery',          amount:  3600, category: 'Food & Dining',    type: 'expense' },
  { id: 't029', date: '2024-12-25', description: 'SIP — Nifty 50 Index Fund',    amount:  5000, category: 'Investment',       type: 'expense' },
  { id: 't030', date: '2024-12-28', description: 'Dividend — Bluechip Fund',     amount:  2400, category: 'Returns',          type: 'income'  },

  // ── January 2025 ───────────────────────────────────────────────────────────
  { id: 't031', date: '2025-01-01', description: 'Monthly Salary — Jan',        amount: 85000, category: 'Salary',           type: 'income'  },
  { id: 't032', date: '2025-01-04', description: 'Electricity Bill — Jan',       amount:  2100, category: 'Bills & Utilities', type: 'expense' },
  { id: 't033', date: '2025-01-07', description: 'Swiggy — Weekend Meals',       amount:  1800, category: 'Food & Dining',    type: 'expense' },
  { id: 't034', date: '2025-01-10', description: 'Laptop Bag — WFH Setup',       amount:  2400, category: 'Shopping',         type: 'expense' },
  { id: 't035', date: '2025-01-14', description: 'Auto Rides — Week 2',          amount:   540, category: 'Transport',        type: 'expense' },
  { id: 't036', date: '2025-01-18', description: 'Freelance — React Dashboard',  amount: 25000, category: 'Freelance',        type: 'income'  },
  { id: 't037', date: '2025-01-20', description: 'OTT Subscriptions',            amount:  1147, category: 'Entertainment',    type: 'expense' },
  { id: 't038', date: '2025-01-24', description: 'Dental Checkup + X-Ray',       amount:  1200, category: 'Healthcare',       type: 'expense' },
  { id: 't039', date: '2025-01-25', description: 'SIP — Nifty 50 Index Fund',    amount:  5000, category: 'Investment',       type: 'expense' },
  { id: 't040', date: '2025-01-29', description: 'Books — Amazon Kindle Store',  amount:   990, category: 'Shopping',         type: 'expense' },

  // ── February 2025 ──────────────────────────────────────────────────────────
  { id: 't041', date: '2025-02-01', description: 'Monthly Salary — Feb',        amount: 85000, category: 'Salary',           type: 'income'  },
  { id: 't042', date: '2025-02-03', description: 'Valentine\'s Day Dinner',      amount:  3200, category: 'Food & Dining',    type: 'expense' },
  { id: 't043', date: '2025-02-07', description: 'Metro Pass — Monthly',         amount:  1200, category: 'Transport',        type: 'expense' },
  { id: 't044', date: '2025-02-10', description: 'Jio Mobile Recharge',          amount:   599, category: 'Bills & Utilities', type: 'expense' },
  { id: 't045', date: '2025-02-12', description: 'Myntra — Clothing Haul',       amount:  4800, category: 'Shopping',         type: 'expense' },
  { id: 't046', date: '2025-02-15', description: 'Dividend — Midcap Fund',       amount:  1800, category: 'Returns',          type: 'income'  },
  { id: 't047', date: '2025-02-18', description: 'PVR Cinemas + Dinner',         amount:  1600, category: 'Entertainment',    type: 'expense' },
  { id: 't048', date: '2025-02-22', description: 'Weekly Grocery',               amount:  3400, category: 'Food & Dining',    type: 'expense' },
  { id: 't049', date: '2025-02-25', description: 'SIP — Nifty 50 Index Fund',    amount:  5000, category: 'Investment',       type: 'expense' },
  { id: 't050', date: '2025-02-27', description: 'Electricity Bill — Feb',       amount:  1900, category: 'Bills & Utilities', type: 'expense' },

  // ── March 2025 ─────────────────────────────────────────────────────────────
  { id: 't051', date: '2025-03-01', description: 'Monthly Salary — Mar',        amount: 85000, category: 'Salary',           type: 'income'  },
  { id: 't052', date: '2025-03-03', description: 'DMart Grocery',                amount:  3800, category: 'Food & Dining',    type: 'expense' },
  { id: 't053', date: '2025-03-05', description: 'Ola Rides — Week 1',           amount:   720, category: 'Transport',        type: 'expense' },
  { id: 't054', date: '2025-03-08', description: 'Holi Celebration Dinner',      amount:  2400, category: 'Food & Dining',    type: 'expense' },
  { id: 't055', date: '2025-03-12', description: 'Sony WH-1000XM5 Headphones',  amount:  6500, category: 'Shopping',         type: 'expense' },
  { id: 't056', date: '2025-03-15', description: 'Freelance — Branding Project', amount: 20000, category: 'Freelance',        type: 'income'  },
  { id: 't057', date: '2025-03-18', description: 'Coldplay Chennai Concert',     amount:  4500, category: 'Entertainment',    type: 'expense' },
  { id: 't058', date: '2025-03-20', description: 'Internet + Mobile Bills',      amount:  1598, category: 'Bills & Utilities', type: 'expense' },
  { id: 't059', date: '2025-03-24', description: 'Vitamins & Supplements',       amount:  1800, category: 'Healthcare',       type: 'expense' },
  { id: 't060', date: '2025-03-25', description: 'SIP — Nifty 50 Index Fund',    amount:  5000, category: 'Investment',       type: 'expense' },
];

// ─── Chart Utilities ───────────────────────────────────────────────────────────

/** Returns monthly income/expense/net summary sorted by month */
export const getMonthlySummary = (txns) => {
  const map = {};
  txns.forEach((t) => {
    const key = t.date.slice(0, 7);
    if (!map[key]) map[key] = { month: key, income: 0, expense: 0 };
    if (t.type === 'income') map[key].income += t.amount;
    else map[key].expense += t.amount;
  });
  return Object.values(map)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((m) => ({
      ...m,
      label: new Date(m.month + '-01').toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
      net: m.income - m.expense,
    }));
};

/** Returns expense totals grouped by category, sorted descending */
export const getSpendingByCategory = (txns) => {
  const map = {};
  txns
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value, color: getCategoryColor(name) }))
    .sort((a, b) => b.value - a.value);
};

/** Returns cumulative balance over time (one data point per transaction date) */
export const getBalanceTrend = (txns) => {
  const sorted = [...txns].sort((a, b) => a.date.localeCompare(b.date));
  const dailyMap = {};
  sorted.forEach((t) => {
    if (!dailyMap[t.date]) dailyMap[t.date] = 0;
    dailyMap[t.date] += t.type === 'income' ? t.amount : -t.amount;
  });
  let cumulative = 0;
  return Object.entries(dailyMap).map(([date, delta]) => {
    cumulative += delta;
    return {
      date,
      label: new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      balance: cumulative,
    };
  });
};
