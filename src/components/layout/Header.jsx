import { Sun, Moon, UserCog, Eye, PanelLeft } from 'lucide-react';
import useStore from '../../store/useStore';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Header() {
  const role          = useStore((s) => s.role);
  const setRole       = useStore((s) => s.setRole);
  const theme         = useStore((s) => s.theme);
  const toggleTheme   = useStore((s) => s.toggleTheme);
  const toggleSidebar = useStore((s) => s.toggleSidebar);

  return (
    <header className="h-15 flex-shrink-0 dark:bg-slate-900 bg-white border-b dark:border-slate-800 border-slate-200 px-5 md:px-7 flex items-center justify-between py-3">
      {/* Left: sidebar toggle (desktop) + greeting */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="hidden md:flex w-9 h-9 rounded-lg dark:bg-slate-800 bg-slate-100 border dark:border-slate-700 border-slate-300 items-center justify-center dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:border-slate-600 hover:border-slate-400 transition-all flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="w-4 h-4" />
        </button>
        <p className="text-sm dark:text-slate-400 text-slate-600">
          {getGreeting()},{' '}
          <span className="dark:text-white text-slate-900 font-medium">Kowshek</span>
        </p>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-2">
        {/* Role switcher — pill toggle */}
        <div className="flex items-center rounded-lg overflow-hidden border dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-slate-100">
          <button
            onClick={() => setRole('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all ${
              role === 'admin'
                ? 'bg-primary text-white'
                : 'dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-900'
            }`}
          >
            <UserCog className="w-3.5 h-3.5 flex-shrink-0" />
            Admin
          </button>
          <button
            onClick={() => setRole('viewer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all ${
              role === 'viewer'
                ? 'dark:bg-slate-600 bg-slate-500 text-white'
                : 'dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5 flex-shrink-0" />
            Viewer
          </button>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg dark:bg-slate-800 bg-slate-100 border dark:border-slate-700 border-slate-300 flex items-center justify-center dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:border-slate-600 hover:border-slate-400 transition-all"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
}