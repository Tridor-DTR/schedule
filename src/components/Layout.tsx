import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import {
  Calendar, LayoutGrid, User, Shield, FileText, Menu, X,
  LogOut, Sun, Moon, ChevronDown, GraduationCap
} from 'lucide-react';

const roleLabels: Record<string, string> = {
  student: 'Ученик',
  teacher: 'Учитель',
  composer: 'Составитель',
  parent: 'Родитель',
  superadmin: 'Суперадмин',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleDropdown, setRoleDropdown] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/schedule', label: 'Расписание', icon: Calendar },
    { path: '/editor', label: 'Составление', icon: LayoutGrid, roles: ['composer'] },
    { path: '/profile', label: 'Профиль', icon: User },
    { path: '/admin', label: 'Управление', icon: Shield, roles: ['superadmin'] },
  ];

  const filteredNav = navItems.filter(item =>
    !item.roles || (state.user && item.roles.includes(state.user.activeRole))
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `} style={{ backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)' }}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #5c7cfa, #f06595)' }}>
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Фрактал</h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Расписание</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {filteredNav.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'font-medium shadow-sm'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: isActive(item.path) ? state.theme.primaryColor + '15' : 'transparent',
                  color: isActive(item.path) ? state.theme.primaryColor : 'var(--text-secondary)',
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User section */}
          {state.user && (
            <div className="p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div className="relative">
                <button
                  onClick={() => setRoleDropdown(!roleDropdown)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: 'var(--bg-tertiary)' }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                    style={{ backgroundColor: state.theme.primaryColor }}>
                    {state.user.name.charAt(0)}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                      {state.user.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {roleLabels[state.user.activeRole]}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                </button>

                {roleDropdown && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 rounded-lg shadow-lg overflow-hidden animate-fade-in"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                    {state.user.roles.map(role => (
                      <button
                        key={role}
                        onClick={() => {
                          dispatch({ type: 'SWITCH_ROLE', payload: role });
                          setRoleDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm transition-colors"
                        style={{
                          color: state.user?.activeRole === role ? state.theme.primaryColor : 'var(--text-secondary)',
                          backgroundColor: state.user?.activeRole === role ? state.theme.primaryColor + '10' : 'transparent',
                        }}
                      >
                        {roleLabels[role]}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        dispatch({ type: 'LOGOUT' });
                        setRoleDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between backdrop-blur-md"
          style={{ backgroundColor: 'var(--bg-primary)ee', borderBottom: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch({ type: 'SET_THEME', payload: { mode: state.theme.mode === 'light' ? 'dark' : 'light' } })}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--bg-tertiary)' }}
              title={state.theme.mode === 'light' ? 'Тёмная тема' : 'Светлая тема'}
            >
              {state.theme.mode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            {!state.isAuthenticated && (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: state.theme.primaryColor }}
              >
                Войти
              </Link>
            )}
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
