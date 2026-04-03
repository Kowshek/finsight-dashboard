import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import useStore from '../../store/useStore';
import { getMonthlySummary } from '../../data/mockData';

const fmtAxis = (n) => `₹${(n / 1000).toFixed(0)}K`;
const fmtFull = (n) =>
  new Intl.NumberFormat('en-IN', {
    style:               'currency',
    currency:            'INR',
    maximumFractionDigits: 0,
  }).format(n);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const net = (payload[0]?.value || 0) - (payload[1]?.value || 0);
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 shadow-xl text-xs space-y-1">
      <p className="dark:text-slate-400 text-slate-600 font-medium mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill }} />
          <span className="dark:text-slate-400 text-slate-600 capitalize">{p.name}:</span>
          <span className="font-mono dark:text-white text-slate-900">{fmtFull(p.value)}</span>
        </div>
      ))}
      <div className="border-t dark:border-slate-700 border-slate-200 pt-1 mt-1 flex items-center gap-2">
        <span className="dark:text-slate-400 text-slate-600">Net:</span>
        <span className={`font-mono font-medium ${net >= 0 ? 'text-income' : 'text-expense'}`}>
          {net >= 0 ? '+' : ''}{fmtFull(net)}
        </span>
      </div>
    </div>
  );
};

const CustomLegend = ({ payload }) => (
  <div className="flex items-center gap-4 justify-center mt-1">
    {payload.map((p) => (
      <div key={p.value} className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: p.color }} />
        <span className="text-xs dark:text-slate-400 text-slate-600 capitalize">{p.value}</span>
      </div>
    ))}
  </div>
);

export default function MonthlyComparison() {
  const transactions = useStore((s) => s.transactions);
  const theme        = useStore((s) => s.theme);
  const data         = getMonthlySummary(transactions);

  const gridStroke = theme === 'dark' ? '#1e293b' : '#e2e8f0';
  const tickFill   = '#64748b';

  return (
    <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold dark:text-white text-slate-900">Monthly Comparison</h3>
        <p className="text-xs text-slate-500 mt-0.5">Income vs Expenses per month</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barGap={6} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: tickFill, fontFamily: 'Sora' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={fmtAxis}
            tick={{ fontSize: 10, fill: tickFill, fontFamily: 'DM Mono' }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100,116,139,0.06)' }} />
          <Legend content={<CustomLegend />} />
          <Bar dataKey="income"  name="Income"   fill="#00C896" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Expenses" fill="#FF4D6A" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
