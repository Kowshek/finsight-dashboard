import { useState } from 'react';
import useStore from '../../store/useStore';

const MONTHS      = ['2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03'];
const MONTH_LABELS = ["Oct '24", "Nov '24", "Dec '24", "Jan '25", "Feb '25", "Mar '25"];
const DAY_LABELS  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const fmt = (n) =>
  new Intl.NumberFormat('en-IN', {
    style:               'currency',
    currency:            'INR',
    maximumFractionDigits: 0,
  }).format(n);

function getCellClass(amount) {
  if (amount === 0)       return 'dark:bg-slate-800 bg-slate-100';
  if (amount < 2000)      return 'bg-primary/20';
  if (amount <= 5000)     return 'bg-primary/50';
  return 'bg-primary/90';
}

export default function SpendingHeatmap() {
  const transactions = useStore((s) => s.transactions);
  const [tooltip, setTooltip] = useState(null); // { mi, dow, amount }

  // Build grid[monthIndex][dayOfWeek] = total spend
  const grid = MONTHS.map(() => Array(7).fill(0));

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const mi = MONTHS.indexOf(t.date.slice(0, 7));
      if (mi === -1) return;
      const dow = new Date(t.date + 'T12:00:00').getDay(); // noon to avoid TZ edge cases
      grid[mi][dow] += t.amount;
    });

  return (
    <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold dark:text-white text-slate-900">Spending Heatmap</h3>
        <p className="text-xs text-slate-500 mt-0.5">Which days do you spend most?</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[360px]">
          {/* Column headers */}
          <div className="flex mb-2 ml-16">
            {DAY_LABELS.map((d) => (
              <div
                key={d}
                className="flex-1 text-center text-[10px] font-semibold text-slate-500 uppercase tracking-wider"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          {MONTHS.map((_, mi) => (
            <div key={mi} className="flex items-center mb-1.5">
              {/* Row label */}
              <div className="w-16 text-[10px] text-slate-500 text-right pr-3 flex-shrink-0">
                {MONTH_LABELS[mi]}
              </div>

              {/* Cells */}
              {grid[mi].map((amount, dow) => (
                <div
                  key={dow}
                  className="relative flex-1 px-0.5"
                  onMouseEnter={() => setTooltip({ mi, dow, amount })}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <div
                    className={`w-full aspect-square rounded-md cursor-default transition-all duration-150 hover:ring-2 hover:ring-primary/50 ${getCellClass(amount)}`}
                  />
                  {/* Tooltip */}
                  {tooltip?.mi === mi && tooltip?.dow === dow && (
                    <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 shadow-xl text-xs whitespace-nowrap pointer-events-none">
                      <p className="text-[10px] dark:text-slate-400 text-slate-500 mb-0.5">
                        {MONTH_LABELS[mi]} · {DAY_LABELS[dow]}
                      </p>
                      <p className="font-mono font-semibold dark:text-white text-slate-900">
                        {amount > 0 ? fmt(amount) : 'No spend'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4">
        <span className="text-[10px] text-slate-500">Less</span>
        <div className="w-4 h-4 rounded-sm dark:bg-slate-800 bg-slate-100 border dark:border-slate-700 border-slate-200" />
        <div className="w-4 h-4 rounded-sm bg-primary/20" />
        <div className="w-4 h-4 rounded-sm bg-primary/50" />
        <div className="w-4 h-4 rounded-sm bg-primary/90" />
        <span className="text-[10px] text-slate-500">More</span>
      </div>
    </div>
  );
}
