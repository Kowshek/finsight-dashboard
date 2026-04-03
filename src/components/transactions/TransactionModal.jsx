import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import useStore from '../../store/useStore';
import { ALL_CATEGORIES } from '../../data/mockData';

const EMPTY_FORM = {
  description: '',
  amount:      '',
  category:    'Food & Dining',
  type:        'expense',
  date:        new Date().toISOString().split('T')[0],
};

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium dark:text-slate-400 text-slate-600">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full dark:bg-slate-800 bg-white dark:border-slate-700 border-slate-300 border rounded-lg px-3 py-2.5 text-sm dark:text-white text-slate-900 ' +
  'dark:placeholder-slate-600 placeholder-slate-400 focus:outline-none focus:border-primary transition-colors';

export default function TransactionModal({ open, onClose, editTx }) {
  const addTransaction    = useStore((s) => s.addTransaction);
  const updateTransaction = useStore((s) => s.updateTransaction);

  const [form,  setForm]  = useState({ ...EMPTY_FORM });
  const [error, setError] = useState('');

  // Reset form when modal opens / switches between add and edit
  useEffect(() => {
    if (!open) return;
    setError('');
    setForm(editTx ? { ...editTx, amount: String(editTx.amount) } : { ...EMPTY_FORM });
  }, [open, editTx]);

  // ESC to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = () => {
    if (!form.description.trim())
      return setError('Description is required.');
    const amt = Number(form.amount);
    if (!form.amount || isNaN(amt) || amt <= 0)
      return setError('Enter a valid positive amount.');
    if (!form.date)
      return setError('Date is required.');

    const tx = { ...form, amount: amt, id: editTx?.id ?? `t${Date.now()}` };
    editTx ? updateTransaction(editTx.id, tx) : addTransaction(tx);
    onClose();
  };

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-slate-800 border-slate-200">
          <h2 className="text-sm font-semibold dark:text-white text-slate-900">
            {editTx ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="dark:text-slate-500 text-slate-400 dark:hover:text-white hover:text-slate-900 transition-colors rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <Field label="Description">
            <input
              className={inputCls}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="e.g. Swiggy — Weekend Order"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Amount (₹)">
              <input
                type="number"
                min="1"
                className={`${inputCls} font-mono`}
                value={form.amount}
                onChange={(e) => set('amount', e.target.value)}
                placeholder="0"
              />
            </Field>
            <Field label="Date">
              <input
                type="date"
                className={inputCls}
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
              />
            </Field>
          </div>

          <Field label="Category">
            <select
              className={inputCls}
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
            >
              {ALL_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Type">
            <div className="grid grid-cols-2 gap-2">
              {['income', 'expense'].map((t) => {
                const active = form.type === t;
                return (
                  <button
                    key={t}
                    onClick={() => set('type', t)}
                    className={`py-2.5 rounded-lg text-sm font-medium transition-all border ${
                      active
                        ? t === 'income'
                          ? 'bg-income/15 text-income border-income/30'
                          : 'bg-expense/15 text-expense border-expense/30'
                        : 'dark:bg-slate-800 bg-slate-100 dark:text-slate-400 text-slate-600 dark:border-slate-700 border-slate-300 dark:hover:border-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                );
              })}
            </div>
          </Field>

          {error && (
            <p className="text-xs text-expense bg-expense/10 border border-expense/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full py-2.5 bg-primary hover:bg-primary/90 active:bg-primary/80 text-white text-sm font-semibold rounded-lg transition-colors mt-1"
          >
            {editTx ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
