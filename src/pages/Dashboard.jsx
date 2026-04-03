import SummaryCards  from '../components/dashboard/SummaryCards';
import BalanceTrend  from '../components/charts/BalanceTrend';
import SpendingBreakdown from '../components/charts/SpendingBreakdown';

export default function Dashboard() {
  return (
    <div className="space-y-6 page-enter">
      <div>
        <h2 className="text-lg font-semibold dark:text-white text-slate-900">Overview</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Financial summary · Oct 2024 — Mar 2025
        </p>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceTrend />
        <SpendingBreakdown />
      </div>
    </div>
  );
}
