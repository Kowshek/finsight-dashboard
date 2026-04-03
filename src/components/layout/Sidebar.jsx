import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  TrendingUp,
  Target,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import useStore from '../../store/useStore';

const NAV = [
  { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard'    },
  { to: '/transactions', icon: ArrowLeftRight,  label: 'Transactions' },
  { to: '/insights',     icon: Lightbulb,       label: 'Insights'     },
  { to: '/budget',       icon: Target,          label: 'Budget'       },
];

export default function Sidebar() {
  const txCount       = useStore((s) => s.transactions.length);
  const sidebarOpen   = useStore((s) => s.sidebarOpen);
  const toggleSidebar = useStore((s) => s.toggleSidebar);

  return (
    <aside
      className={`hidden md:flex flex-shrink-0 flex-col dark:bg-slate-900 bg-white border-r dark:border-slate-800 border-slate-200 h-screen overflow-hidden transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'w-60' : 'w-16'
      }`}
    >
      {/* Brand */}
      <div
        className={`border-b dark:border-slate-800 border-slate-200 flex items-center h-[61px] flex-shrink-0 transition-all duration-300 ${
          sidebarOpen ? 'px-5 gap-3' : 'justify-center px-0'
        }`}
      >
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <span
          className={`font-semibold dark:text-white text-slate-900 tracking-tight whitespace-nowrap transition-opacity duration-200 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
          }`}
        >
          Finsight
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-hidden">
        <p
          className={`text-[10px] font-semibold dark:text-slate-600 text-slate-400 uppercase tracking-widest mb-3 transition-opacity duration-200 ${
            sidebarOpen ? 'opacity-100 px-3' : 'opacity-0 h-0 mb-0 overflow-hidden'
          }`}
        >
          Menu
        </p>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center rounded-lg text-sm font-medium transition-all duration-150 ${
                sidebarOpen ? 'gap-3 px-3 py-2.5' : 'justify-center py-2.5 px-0'
              } ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-900 dark:hover:bg-slate-800/60 hover:bg-slate-100'
              }`
            }
          >
            {({ isActive }) =>
              sidebarOpen ? (
                <>
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
                  <span className="flex-1 whitespace-nowrap">{label}</span>
                  {label === 'Transactions' && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {txCount}
                    </span>
                  )}
                </>
              ) : (
                <div className="relative group">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50 border border-slate-700">
                    {label}
                  </span>
                </div>
              )
            }
          </NavLink>
        ))}
      </nav>

      {/* Toggle button */}
      <div className={`flex-shrink-0 border-t dark:border-slate-800 border-slate-200 ${sidebarOpen ? '' : ''}`}>
        <button
          onClick={toggleSidebar}
          className={`w-full flex items-center px-3 py-2.5 text-slate-500 hover:text-slate-300 transition-colors ${
            sidebarOpen ? 'justify-end' : 'justify-center'
          }`}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Footer — hidden when collapsed */}
      <div
        className={`px-5 py-4 border-t dark:border-slate-800 border-slate-200 transition-all duration-200 overflow-hidden flex-shrink-0 ${
          sidebarOpen ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 py-0 border-t-0'
        }`}
      >
        <p className="text-[11px] dark:text-slate-600 text-slate-400">Finance Dashboard v1.0</p>
        <p className="text-[11px] dark:text-slate-700 text-slate-500 mt-0.5">Oct 2024 — Mar 2025</p>
      </div>
    </aside>
  );
}
