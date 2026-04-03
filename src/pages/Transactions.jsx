import { useState } from 'react';
import { Plus, Lock, Download, X } from 'lucide-react';
import Filters          from '../components/transactions/Filters';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionModal from '../components/transactions/TransactionModal';
import useStore         from '../store/useStore';
import { useFilteredTransactions } from '../store/useFilteredTransactions';

export default function Transactions() {
  const role         = useStore((s) => s.role);
  const filters      = useStore((s) => s.filters);
  const setFilter    = useStore((s) => s.setFilter);
  const resetFilters = useStore((s) => s.resetFilters);
  const filtered     = useFilteredTransactions();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTx,    setEditTx]    = useState(null);

  const handleEdit  = (tx) => { setEditTx(tx);   setModalOpen(true);  };
  const handleAdd   = ()   => { setEditTx(null);  setModalOpen(true);  };
  const handleClose = ()   => { setModalOpen(false); setEditTx(null);  };

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount (INR)'];
    const rows = filtered.map((t) => [
      t.date,
      `"${t.description}"`,
      t.category,
      t.type,
      t.amount,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finsight-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Build active filter chips
  const chips = [];
  if (filters.search)
    chips.push({ key: 'search',   label: `"${filters.search}"`,           clear: () => setFilter('search', '') });
  if (filters.category !== 'all')
    chips.push({ key: 'category', label: `Category: ${filters.category}`, clear: () => setFilter('category', 'all') });
  if (filters.type !== 'all')
    chips.push({ key: 'type',     label: `Type: ${filters.type[0].toUpperCase() + filters.type.slice(1)}`, clear: () => setFilter('type', 'all') });
  if (filters.dateFrom)
    chips.push({ key: 'dateFrom', label: `From: ${filters.dateFrom}`,     clear: () => setFilter('dateFrom', '') });
  if (filters.dateTo)
    chips.push({ key: 'dateTo',   label: `To: ${filters.dateTo}`,         clear: () => setFilter('dateTo', '') });

  return (
    <div className="space-y-5 page-enter">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold dark:text-white text-slate-900">Transactions</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {filtered.length} transaction{filtered.length !== 1 ? 's' : ''} matched
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Export CSV — visible to all roles */}
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 border dark:border-slate-700 border-slate-300 dark:bg-transparent bg-white dark:text-slate-300 text-slate-700 dark:hover:border-slate-600 hover:border-slate-400 dark:hover:text-white hover:text-slate-900 text-sm font-medium rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>

          {role === 'admin' ? (
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90
                         active:bg-primary/80 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2.5 dark:bg-slate-800 bg-slate-100 border dark:border-slate-700 border-slate-300 rounded-lg text-sm text-slate-500 cursor-not-allowed select-none">
              <Lock className="w-3.5 h-3.5" />
              Viewer Mode
            </div>
          )}
        </div>
      </div>

      {/* Viewer notice */}
      {role === 'viewer' && (
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-amber-400/80">
          👁 You&apos;re in <strong>Viewer</strong> mode. Switch to <strong>Admin</strong> in the header to add, edit, or delete transactions.
        </div>
      )}

      <Filters />

      {/* Active filter chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {chips.map(({ key, label, clear }) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
            >
              {label}
              <button
                onClick={clear}
                className="hover:opacity-70 transition-opacity"
                aria-label={`Remove ${key} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {chips.length > 1 && (
            <button
              onClick={resetFilters}
              className="text-xs text-slate-500 dark:hover:text-slate-300 hover:text-slate-700 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      <TransactionTable onEdit={handleEdit} />
      <TransactionModal open={modalOpen} onClose={handleClose} editTx={editTx} />
    </div>
  );
}
