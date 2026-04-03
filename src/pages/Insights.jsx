import InsightCards           from '../components/insights/InsightCards';
import SpendingHeatmap        from '../components/insights/SpendingHeatmap';
import RecurringTransactions  from '../components/insights/RecurringTransactions';
import MonthlyComparison      from '../components/charts/MonthlyComparison';

export default function Insights() {
  return (
    <div className="space-y-6 page-enter">
      <div>
        <h2 className="text-lg font-semibold dark:text-white text-slate-900">Insights</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Patterns and observations from your financial data
        </p>
      </div>

      <InsightCards />
      <SpendingHeatmap />
      <RecurringTransactions />
      <MonthlyComparison />
    </div>
  );
}
