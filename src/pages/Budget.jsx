import BudgetTracker from '../components/budget/BudgetTracker';

export default function Budget() {
  return (
    <div className="space-y-6 page-enter">
      <div>
        <h2 className="text-lg font-semibold dark:text-white text-slate-900">Budget Tracker</h2>
        <p className="text-sm text-slate-500 mt-0.5">March 2025 spending vs your limits</p>
      </div>

      <BudgetTracker />

      <p className="text-xs text-slate-500 text-center pb-2">
        💡 Click any budget amount to edit it (Admin only)
      </p>
    </div>
  );
}
