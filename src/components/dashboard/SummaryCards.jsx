import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import useStore from '../../store/useStore';
import { useCountUp } from '../../hooks/useCountUp';

const fmt = (n) =>
  new Intl.NumberFormat('en-IN', {
    style:               'currency',
    currency:            'INR',
    maximumFractionDigits: 0,
  }).format(n);

export default function SummaryCards() {
  const transactions = useStore((s) => s.transactions);

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0);
  const balance     = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0
    ? ((balance / totalIncome) * 100).toFixed(1)
    : '0.0';

  const animBalance  = useCountUp(balance);
  const animIncome   = useCountUp(totalIncome);
  const animExpenses = useCountUp(totalExpenses);

  const cards = [
    {
      label:   'Net Balance',
      value:   fmt(animBalance),
      sub:     'Oct 2024 — Mar 2025',
      icon:    Wallet,
      color:   'text-primary',
      bg:      'bg-primary/10',
      border:  'border-primary/20',
    },
    {
      label:   'Total Income',
      value:   fmt(animIncome),
      sub:     'Salary + Freelance + Returns',
      icon:    TrendingUp,
      color:   'text-income',
      bg:      'bg-income/10',
      border:  'border-income/20',
    },
    {
      label:   'Total Expenses',
      value:   fmt(animExpenses),
      sub:     'All categories combined',
      icon:    TrendingDown,
      color:   'text-expense',
      bg:      'bg-expense/10',
      border:  'border-expense/20',
    },
    {
      label:   'Savings Rate',
      value:   `${savingsRate}%`,
      sub:     'Of total income saved',
      icon:    PiggyBank,
      color:   'text-amber-400',
      bg:      'bg-amber-400/10',
      border:  'border-amber-400/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(({ label, value, sub, icon: Icon, color, bg, border }) => (
        <div
          key={label}
          className={`dark:bg-slate-900 bg-white border ${border} rounded-xl p-5 hover:border-opacity-50 transition-all duration-200 hover:-translate-y-0.5`}
        >
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {label}
            </p>
            <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
          </div>
          <p className={`text-2xl font-semibold font-mono ${color} leading-tight`}>
            {value}
          </p>
          <p className="text-xs dark:text-slate-600 text-slate-400 mt-1.5">{sub}</p>
        </div>
      ))}
    </div>
  );
}
