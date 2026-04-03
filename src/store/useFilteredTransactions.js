import useStore from './useStore';

export function useFilteredTransactions() {
  const transactions = useStore((s) => s.transactions);
  const filters      = useStore((s) => s.filters);

  let result = [...transactions];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }
  if (filters.category !== 'all') {
    result = result.filter((t) => t.category === filters.category);
  }
  if (filters.type !== 'all') {
    result = result.filter((t) => t.type === filters.type);
  }
  if (filters.dateFrom) {
    result = result.filter((t) => t.date >= filters.dateFrom);
  }
  if (filters.dateTo) {
    result = result.filter((t) => t.date <= filters.dateTo);
  }

  result.sort((a, b) => {
    if (filters.sortBy === 'amount') {
      return filters.sortOrder === 'desc'
        ? b.amount - a.amount
        : a.amount - b.amount;
    }
    return filters.sortOrder === 'desc'
      ? b.date.localeCompare(a.date)
      : a.date.localeCompare(b.date);
  });

  return result;
}
