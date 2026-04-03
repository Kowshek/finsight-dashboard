import { useState } from 'react';
import useStore from '../../store/useStore';
import { getCategoryColor } from '../../data/mockData';

const CURRENT_MONTH = '2025-03';

const fmt = (n) =>
  new Intl.NumberFormat('en-IN', {
    style:               'currency',
    currency:            'INR',
    maximumFractionDigits: 0,
  }).format(n);

export default function BudgetTracker() {
  const transactions = useStore((s) => s.transactions);
  const budgets      = useStore((s) => s.budgets);
  const setBudget    = useStore((s) => s.setBudget);
  const role         = useStore((s) => s.role);

  const [editing,   setEditing]   = useState(null);
  const [editValue, setEditValue] = useState('');

  // Group March 2025 expenses by category
  const monthExpenses = {};
  transactions
    .filter((t) => t.type === 'expense' && t.date.startsWith(CURRENT_MONTH))
    .forEach((t) => {
      monthExpenses[t.category] = (monthExpenses[t.category] || 0) + t.amount;
    });

  const budgetCategories = Object.keys(budgets);
  const withinBudget = budgetCategories.filter(
    (cat) => (monthExpenses[cat] || 0) <= budgets[cat]
  ).length;

  const startEdit = (cat) => {
    setEditing(cat);
    setEditValue(String(budgets[cat]));
  };

  const saveEdit = (cat) => {
    const val = Number(editValue);
    if (!isNaN(val) && val > 0) setBudget(cat, val);
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-xl">
          🎯
        </div>
        <div>
          <p className="text-sm font-semibold dark:text-white text-slate-900">
            {withinBudget} of {budgetCategories.length} categories within budget
          </p>
          <p className="text-xs text-slate-500 mt-0.5">March 2025 · Click any budget amount to edit (Admin only)</p>
        </div>
        <div className="ml-auto flex gap-1.5">
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-income/10 text-income border border-income/20 font-medium">
            {withinBudget} on track
          </span>
          {budgetCategories.length - withinBudget > 0 && (
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-expense/10 text-expense border border-expense/20 font-medium">
              {budgetCategories.length - withinBudget} over
            </span>
          )}
        </div>
      </div>

      {/* Budget rows */}
      <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 rounded-xl divide-y dark:divide-slate-800 divide-slate-200">
        {budgetCategories.map((cat) => {
          const spent     = monthExpenses[cat] || 0;
          const budget    = budgets[cat];
          const pct       = Math.min((spent / budget) * 100, 100);
          const overBudget = spent > budget;
          const color     = getCategoryColor(cat);

          const barColor = overBudget
            ? 'bg-expense'
            : pct >= 75
            ? 'bg-amber-400'
            : 'bg-income';

          return (
            <div key={cat} className="px-5 py-4">
              {/* Row header */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm font-medium dark:text-slate-200 text-slate-800 truncate">
                    {cat}
                  </span>
                  {overBudget && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-expense/10 text-expense border border-expense/20 flex-shrink-0">
                      Over by {fmt(spent - budget)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs font-mono flex-shrink-0 ml-4">
                  <span className={overBudget ? 'text-expense font-semibold' : 'dark:text-slate-200 text-slate-800'}>
                    {fmt(spent)}
                  </span>
                  <span className="text-slate-500">/</span>
                  {editing === cat ? (
                    <input
                      autoFocus
                      type="number"
                      min="1"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => saveEdit(cat)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(cat);
                        if (e.key === 'Escape') setEditing(null);
                      }}
                      className="w-20 text-xs font-mono dark:bg-slate-800 bg-slate-100 border dark:border-primary border-primary rounded px-1.5 py-0.5 focus:outline-none text-primary"
                    />
                  ) : (
                    <button
                      onClick={() => role === 'admin' && startEdit(cat)}
                      className={`dark:text-slate-400 text-slate-600 transition-colors ${
                        role === 'admin'
                          ? 'hover:text-primary cursor-pointer'
                          : 'cursor-default'
                      }`}
                      title={role === 'admin' ? 'Click to edit budget' : undefined}
                    >
                      {fmt(budget)}
                    </button>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 dark:bg-slate-800 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-slate-500">{pct.toFixed(0)}% used</span>
                <span className="text-[10px] text-slate-500">
                  {overBudget
                    ? '⚠ Over limit'
                    : `${fmt(budget - spent)} remaining`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
