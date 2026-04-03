import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Target } from 'lucide-react';
import Sidebar      from './components/layout/Sidebar';
import Header       from './components/layout/Header';
import Dashboard    from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights     from './pages/Insights';
import Budget       from './pages/Budget';
import useStore     from './store/useStore';

const TABS = [
  { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard'    },
  { to: '/transactions', icon: ArrowLeftRight,  label: 'Transactions' },
  { to: '/insights',     icon: Lightbulb,       label: 'Insights'     },
  { to: '/budget',       icon: Target,          label: 'Budget'       },
];

export default function App() {
  const theme = useStore((s) => s.theme);

  // Sync theme class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="flex h-screen dark:bg-slate-950 bg-white dark:text-slate-100 text-slate-900 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto dark:bg-slate-950 bg-slate-50 p-5 md:p-7 pb-20 md:pb-7">
            <Routes>
              <Route path="/"             element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard"    element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/insights"     element={<Insights />} />
              <Route path="/budget"       element={<Budget />} />
            </Routes>
          </main>
        </div>
      </div>

      {/* Mobile bottom tab bar — scrollable row for 4 tabs */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex overflow-x-auto border-t dark:border-slate-800 border-slate-200 dark:bg-slate-900 bg-white">
        {TABS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex-1 min-w-[64px] flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                isActive ? 'text-primary' : 'dark:text-slate-500 text-slate-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </BrowserRouter>
  );
}
