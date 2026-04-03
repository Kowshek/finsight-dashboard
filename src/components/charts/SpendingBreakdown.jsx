import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import useStore from '../../store/useStore';
import { getSpendingByCategory } from '../../data/mockData';

const fmtFull = (n) =>
  new Intl.NumberFormat('en-IN', {
    style:               'currency',
    currency:            'INR',
    maximumFractionDigits: 0,
  }).format(n);

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-xl text-xs">
      <p className="dark:text-slate-300 text-slate-700 font-medium mb-0.5">{name}</p>
      <p className="dark:text-white text-slate-900 font-mono">{fmtFull(value)}</p>
    </div>
  );
};

export default function SpendingBreakdown() {
  const transactions = useStore((s) => s.transactions);
  const data = getSpendingByCategory(transactions);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold dark:text-white text-slate-900">Spending Breakdown</h3>
        <p className="text-xs text-slate-500 mt-0.5">Expenses by category</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Donut */}
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                dataKey="value"
                paddingAngle={3}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-[10px] text-slate-500">Total</p>
            <p className="text-xs font-mono font-semibold dark:text-white text-slate-900">
              ₹{(total / 1000).toFixed(0)}K
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2 w-full">
          {data.map(({ name, value, color }) => {
            const pct = ((value / total) * 100).toFixed(0);
            return (
              <div key={name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                <span className="text-xs dark:text-slate-400 text-slate-600 flex-1 truncate">{name}</span>
                <span className="text-xs font-mono dark:text-slate-300 text-slate-700">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
