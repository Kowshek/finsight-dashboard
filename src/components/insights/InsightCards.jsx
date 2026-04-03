import {
  TrendingDown,
  TrendingUp,
  Target,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Banknote,
  Repeat,
} from 'lucide-react';
import useStore from '../../store/useStore';
import { getMonthlySummary, getSpendingByCategory } from '../../data/mockData';

const fmtFull = (n) =>
  new Intl.NumberFormat('en-IN', {
    style:               'currency',
    currency:            'INR',
    maximumFractionDigits: 0,
  }).format(n);

function InsightCard({ icon: Icon, iconColor, iconBg, title, value, valueColor, sub }) {
  return (
    <div className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-200 border rounded-xl p-5 dark:hover:border-slate-700 hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5">
      <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center mb-4`}>
        <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
      </div>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{title}</p>
      <p className={`text-xl font-semibold font-mono mt-1.5 ${valueColor ?? 'dark:text-white text-slate-900'}`}>{value}</p>
      <p className="text-xs dark:text-slate-600 text-slate-400 mt-1">{sub}</p>
    </div>
  );
}

export default function InsightCards() {
  const transactions = useStore((s) => s.transactions);

  const monthly         = getMonthlySummary(transactions);
  const spending        = getSpendingByCategory(transactions);
  const topCat          = spending[0];
  const avgMonthlyExp   = monthly.reduce((s, m) => s + m.expense, 0) / (monthly.length || 1);
  const latestMonth     = monthly[monthly.length - 1];
  const frugalMonth     = [...monthly].sort((a, b) => a.expense - b.expense)[0];
  const bestIncomeMonth = [...monthly].sort((a, b) => b.income - a.income)[0];
  const totalNet        = monthly.reduce((s, m) => s + m.net, 0);
  const savingsRate     = latestMonth
    ? (((latestMonth.income - latestMonth.expense) / latestMonth.income) * 100)
    : 0;
  const savingsHealthy  = savingsRate >= 30;

  // Month-over-month expense change
  let momChange = null;
  if (monthly.length >= 2) {
    const prev = monthly[monthly.length - 2].expense;
    const curr = monthly[monthly.length - 1].expense;
    momChange = (((curr - prev) / prev) * 100).toFixed(1);
  }

  const cards = [
    {
      icon:       TrendingDown,
      iconColor:  'text-expense',
      iconBg:     'bg-expense/10',
      title:      'Top Spending Category',
      value:      topCat?.name ?? '—',
      valueColor: 'text-expense',
      sub:        topCat ? `${fmtFull(topCat.value)} total spent` : 'No data',
    },
    {
      icon:       TrendingUp,
      iconColor:  'text-income',
      iconBg:     'bg-income/10',
      title:      'Best Income Month',
      value:      bestIncomeMonth?.label ?? '—',
      valueColor: 'text-income',
      sub:        bestIncomeMonth ? `${fmtFull(bestIncomeMonth.income)} earned` : 'No data',
    },
    {
      icon:       Target,
      iconColor:  'text-primary',
      iconBg:     'bg-primary/10',
      title:      'Avg Monthly Expenses',
      value:      fmtFull(avgMonthlyExp),
      valueColor: 'text-primary',
      sub:        `Over ${monthly.length} months`,
    },
    {
      icon:       savingsHealthy ? CheckCircle : AlertCircle,
      iconColor:  savingsHealthy ? 'text-income' : 'text-amber-400',
      iconBg:     savingsHealthy ? 'bg-income/10' : 'bg-amber-400/10',
      title:      'Latest Month Savings Rate',
      value:      `${savingsRate.toFixed(1)}%`,
      valueColor: savingsHealthy ? 'text-income' : 'text-amber-400',
      sub:        savingsHealthy ? '🎉 Great savings discipline!' : '⚠️ Consider cutting expenses',
    },
    {
      icon:       BarChart3,
      iconColor:  'text-purple-400',
      iconBg:     'bg-purple-400/10',
      title:      'Most Frugal Month',
      value:      frugalMonth?.label ?? '—',
      valueColor: 'text-purple-400',
      sub:        frugalMonth ? `Only ${fmtFull(frugalMonth.expense)} in expenses` : 'No data',
    },
    {
      icon:       Banknote,
      iconColor:  'text-amber-400',
      iconBg:     'bg-amber-400/10',
      title:      '6-Month Net Savings',
      value:      fmtFull(totalNet),
      valueColor: totalNet >= 0 ? 'text-amber-400' : 'text-expense',
      sub:        'Total income minus all expenses',
    },
    {
      icon:       Repeat,
      iconColor:  'text-sky-400',
      iconBg:     'bg-sky-400/10',
      title:      'MoM Expense Change',
      value:      momChange !== null ? `${momChange > 0 ? '+' : ''}${momChange}%` : '—',
      valueColor: momChange > 0 ? 'text-expense' : 'text-income',
      sub:        'vs previous month expenses',
    },
    {
      icon:       TrendingDown,
      iconColor:  'text-rose-400',
      iconBg:     'bg-rose-400/10',
      title:      '2nd Highest Spending',
      value:      spending[1]?.name ?? '—',
      valueColor: 'text-rose-400',
      sub:        spending[1] ? `${fmtFull(spending[1].value)} total spent` : 'No data',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c) => (
        <InsightCard key={c.title} {...c} />
      ))}
    </div>
  );
}
