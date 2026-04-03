import { format } from 'date-fns';
import { Pencil, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import useStore from '../../store/useStore';
import { getCategoryColor } from '../../data/mockData';
import { useFilteredTransactions } from '../../store/useFilteredTransactions';

const fmtFull = (n) =>
  new Intl.NumberFormat('en-IN', {
    style:               'currency',
    currency:            'INR',
    maximumFractionDigits: 0,
  }).format(n);

function EmptyState() {
  return (
    <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 rounded-xl py-16 text-center">
      <p className="text-3xl mb-3">🔍</p>
      <p className="text-sm font-medium dark:text-slate-300 text-slate-700">No transactions found</p>
      <p className="text-xs dark:text-slate-600 text-slate-400 mt-1">Try adjusting your filters</p>
    </div>
  );
}

export default function TransactionTable({ onEdit }) {
  const role              = useStore((s) => s.role);
  const deleteTransaction = useStore((s) => s.deleteTransaction);
  const filtered          = useFilteredTransactions();

  if (!filtered.length) return <EmptyState />;

  return (
    <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-slate-800 border-slate-200">
              {['Date', 'Description', 'Category', 'Type', 'Amount'].map((h) => (
                <th
                  key={h}
                  className={`text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 ${
                    h === 'Amount' ? 'text-right' : 'text-left'
                  }`}
                >
                  {h}
                </th>
              ))}
              {role === 'admin' && <th className="px-5 py-3 w-16" />}
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-800/60 divide-slate-200">
            {filtered.map((tx) => (
              <tr
                key={tx.id}
                className="group dark:hover:bg-slate-800/30 hover:bg-slate-50 transition-colors duration-100"
              >
                {/* Date */}
                <td className="px-5 py-3.5 text-xs text-slate-500 font-mono whitespace-nowrap">
                  {format(new Date(tx.date), 'dd MMM yy')}
                </td>

                {/* Description */}
                <td className="px-5 py-3.5 text-sm dark:text-slate-200 text-slate-800 max-w-[220px] truncate">
                  {tx.description}
                </td>

                {/* Category badge */}
                <td className="px-5 py-3.5">
                  <span
                    className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{
                      backgroundColor: getCategoryColor(tx.category) + '20',
                      color:           getCategoryColor(tx.category),
                    }}
                  >
                    {tx.category}
                  </span>
                </td>

                {/* Type */}
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium ${
                      tx.type === 'income' ? 'text-income' : 'text-expense'
                    }`}
                  >
                    {tx.type === 'income' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownLeft className="w-3 h-3" />
                    )}
                    {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  </span>
                </td>

                {/* Amount */}
                <td
                  className={`px-5 py-3.5 text-right font-mono text-sm font-semibold whitespace-nowrap ${
                    tx.type === 'income' ? 'text-income' : 'text-expense'
                  }`}
                >
                  {tx.type === 'income' ? '+' : '−'}
                  {fmtFull(tx.amount)}
                </td>

                {/* Admin actions */}
                {role === 'admin' && (
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(tx)}
                        className="text-slate-500 hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="text-slate-500 hover:text-expense transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      <div className="px-5 py-3 border-t dark:border-slate-800 border-slate-200">
        <p className="text-xs dark:text-slate-600 text-slate-400">
          Showing <span className="dark:text-slate-400 text-slate-600">{filtered.length}</span> transaction
          {filtered.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
