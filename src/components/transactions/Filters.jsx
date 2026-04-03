import { Search, X } from 'lucide-react';
import useStore from '../../store/useStore';
import { ALL_CATEGORIES } from '../../data/mockData';

const selectCls =
  'dark:bg-slate-800 bg-white dark:border-slate-700 border-slate-300 border rounded-lg px-3 py-2 text-sm dark:text-slate-200 text-slate-800 ' +
  'focus:outline-none focus:border-primary transition-colors cursor-pointer';

export default function Filters() {
  const filters      = useStore((s) => s.filters);
  const setFilter    = useStore((s) => s.setFilter);
  const resetFilters = useStore((s) => s.resetFilters);

  const hasActive =
    filters.search ||
    filters.category !== 'all' ||
    filters.type !== 'all' ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-4">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          <input
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            placeholder="Search transactions..."
            className="w-full pl-9 pr-3 py-2 dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 rounded-lg text-sm
                       dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value)}
          className={selectCls}
        >
          <option value="all">All Categories</option>
          {ALL_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Type */}
        <select
          value={filters.type}
          onChange={(e) => setFilter('type', e.target.value)}
          className={selectCls}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Sort */}
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [by, order] = e.target.value.split('-');
            setFilter('sortBy', by);
            setFilter('sortOrder', order);
          }}
          className={selectCls}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>

        {/* Date range */}
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilter('dateFrom', e.target.value)}
          className={selectCls}
          title="From date"
        />
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilter('dateTo', e.target.value)}
          className={selectCls}
          title="To date"
        />

        {/* Reset */}
        {hasActive && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-3 py-2 dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 rounded-lg
                       text-sm dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:border-slate-600 hover:border-slate-400 transition-all"
          >
            <X className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
