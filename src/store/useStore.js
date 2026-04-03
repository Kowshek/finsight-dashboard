import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { transactions as initialTransactions } from '../data/mockData';

const DEFAULT_FILTERS = {
  search:    '',
  category:  'all',
  type:      'all',
  sortBy:    'date',
  sortOrder: 'desc',
  dateFrom:  '',
  dateTo:    '',
};

const DEFAULT_BUDGETS = {
  'Food & Dining':     8000,
  'Transport':         3000,
  'Shopping':         10000,
  'Bills & Utilities':  5000,
  'Entertainment':     3000,
  'Healthcare':        3000,
  'Investment':        5000,
};

const useStore = create(
  persist(
    (set, get) => ({
      // ── State ─────────────────────────────────────────────────────────────
      transactions:  initialTransactions,
      role:          'admin',   // 'admin' | 'viewer'
      theme:         'dark',    // 'dark' | 'light'
      filters:       { ...DEFAULT_FILTERS },
      budgets:       { ...DEFAULT_BUDGETS },
      sidebarOpen:   true,

      // ── Role & Theme ──────────────────────────────────────────────────────
      setRole: (role) => set({ role }),

      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      // ── Filters ───────────────────────────────────────────────────────────
      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),

      resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),

      // ── CRUD (admin only — enforced in UI, not here) ──────────────────────
      addTransaction: (tx) =>
        set((s) => ({ transactions: [tx, ...s.transactions] })),

      updateTransaction: (id, updates) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      // ── Budgets ───────────────────────────────────────────────────────────
      setBudget: (category, amount) =>
        set((s) => ({ budgets: { ...s.budgets, [category]: amount } })),

      // ── Derived: overall summary ──────────────────────────────────────────
      getSummary: () => {
        const { transactions } = get();
        const totalIncome = transactions
          .filter((t) => t.type === 'income')
          .reduce((s, t) => s + t.amount, 0);
        const totalExpenses = transactions
          .filter((t) => t.type === 'expense')
          .reduce((s, t) => s + t.amount, 0);
        const balance = totalIncome - totalExpenses;
        const savingsRate =
          totalIncome > 0
            ? ((balance / totalIncome) * 100).toFixed(1)
            : '0.0';
        return { totalIncome, totalExpenses, balance, savingsRate };
      },
    }),
    {
      name:        'finsight-store',
      partialize:  (s) => ({
        transactions: s.transactions,
        role:         s.role,
        theme:        s.theme,
        budgets:      s.budgets,
        sidebarOpen:  s.sidebarOpen,
      }),
    }
  )
);

export default useStore;