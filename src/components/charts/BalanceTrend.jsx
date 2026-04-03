import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useStore from '../../store/useStore';
import { getBalanceTrend } from '../../data/mockData';

const fmtAxis  = (n) => `₹${(n / 1000).toFixed(0)}K`;
const fmtFull  = (n) =>
  new Intl.NumberFormat('en-IN', {
    style:               'currency',
    currency:            'INR',
    maximumFractionDigits: 0,
  }).format(n);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-xl text-xs">
      <p className="dark:text-slate-400 text-slate-600 mb-1">{label}</p>
      <p className="text-primary font-mono font-medium">{fmtFull(payload[0].value)}</p>
    </div>
  );
};

export default function BalanceTrend() {
  const transactions = useStore((s) => s.transactions);
  const theme        = useStore((s) => s.theme);
  const allPoints    = getBalanceTrend(transactions);

  // Sample every 3rd point + always include last for readability
  const data = allPoints.filter((_, i) => i % 3 === 0 || i === allPoints.length - 1);

  const gridStroke = theme === 'dark' ? '#1e293b' : '#e2e8f0';
  const tickFill   = '#64748b';

  return (
    <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold dark:text-white text-slate-900">Balance Trend</h3>
        <p className="text-xs text-slate-500 mt-0.5">Cumulative net balance over time</p>
      </div>
      <ResponsiveContainer width="100%" height={210}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#5B8EF7" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#5B8EF7" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: tickFill, fontFamily: 'Sora' }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tickFormatter={fmtAxis}
            tick={{ fontSize: 10, fill: tickFill, fontFamily: 'DM Mono' }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#5B8EF7', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#5B8EF7"
            strokeWidth={2}
            fill="url(#balanceGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#5B8EF7', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
