import { RefreshCw } from 'lucide-react';
import useStore from '../../store/useStore';
import { getCategoryColor } from '../../data/mockData';

const MONTH_NAMES_RE = /\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/gi;
const YEAR_RE        = /\b20\d{2}\b/g;
const SEPARATOR_RE   = /\s*[—–\-]+\s*/g;

function normalize(desc) {
  return desc
    .toLowerCase()
    .replace(MONTH_NAMES_RE, '')
    .replace(YEAR_RE, '')
    .replace(SEPARATOR_RE, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toTitleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

const fmtFull = (n) =>
  new Intl.NumberFormat('en-IN', {
    style:               'currency',
    currency:            'INR',
    maximumFractionDigits: 0,
  }).format(n);

export default function RecurringTransactions() {
  const transactions = useStore((s) => s.transactions);

  // Group by normalized description key
  const groups = {};
  transactions.forEach((t) => {
    const key = normalize(t.description);
    if (!groups[key]) groups[key] = { key, txns: [] };
    groups[key].txns.push(t);
  });

  const recurring = Object.values(groups)
    .filter((g) => g.txns.length >= 3)
    .map((g) => {
      const avgAmount = g.txns.reduce((s, t) => s + t.amount, 0) / g.txns.length;

      // Most common category
      const catCount = {};
      g.txns.forEach((t) => { catCount[t.category] = (catCount[t.category] || 0) + 1; });
      const topCat = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0][0];

      return {
        key:       g.key,
        label:     toTitleCase(g.key),
        count:     g.txns.length,
        avgAmount,
        category:  topCat,
      };
    })
    .sort((a, b) => b.count - a.count);

  return (
    <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold dark:text-white text-slate-900 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-primary" />
          Recurring Transactions Detected
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Automatically identified from your history</p>
      </div>

      {recurring.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-2xl mb-2">🔍</p>
          <p className="text-sm dark:text-slate-400 text-slate-500">No recurring patterns found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {recurring.map(({ key, label, count, avgAmount, category }) => {
            const color = getCategoryColor(category);
            return (
              <div
                key={key}
                className="flex items-center gap-3 px-4 py-3 dark:bg-slate-800/50 bg-slate-50 rounded-lg border dark:border-slate-800 border-slate-200"
              >
                <RefreshCw className="w-3.5 h-3.5 flex-shrink-0 text-primary opacity-60" />

                <span className="flex-1 text-sm dark:text-slate-200 text-slate-800 truncate font-medium">
                  {label}
                </span>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 flex-shrink-0 tabular-nums">
                  {count}×
                </span>

                <span className="font-mono text-xs dark:text-slate-300 text-slate-700 flex-shrink-0 w-24 text-right tabular-nums">
                  ~{fmtFull(avgAmount)}
                </span>

                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:inline-flex"
                  style={{ backgroundColor: color + '20', color }}
                >
                  {category}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
