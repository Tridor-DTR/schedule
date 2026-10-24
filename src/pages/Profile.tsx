import { useState } from 'react';
import { useApp, Role } from '../store/AppContext';
import {
  User, Palette, Bell, Shield, LogOut, ChevronRight,
  Sun, Moon, GraduationCap, BookOpen, Eye
} from 'lucide-react';

const roleLabels: Record<string, string> = {
  student: 'Ученик',
  teacher: 'Учитель',
  composer: 'Составитель',
  parent: 'Родитель',
  superadmin: 'Суперадмин',
};

const roleIcons: Record<string, any> = {
  student: BookOpen,
  teacher: GraduationCap,
  composer: Palette,
  parent: Eye,
  superadmin: Shield,
};

const presetThemes = [
  { name: 'Светлая', mode: 'light' as const, primary: '#5c7cfa', accent: '#f06595' },
  { name: 'Тёмная', mode: 'dark' as const, primary: '#748ffc', accent: '#f783ac' },
  { name: 'Океан', mode: 'light' as const, primary: '#228be6', accent: '#15aabf' },
  { name: 'Лес', mode: 'light' as const, primary: '#37b24d', accent: '#f59f00' },
  { name: 'Закат', mode: 'dark' as const, primary: '#f76707', accent: '#e64980' },
  { name: 'Лаванда', mode: 'light' as const, primary: '#7950f2', accent: '#f06595' },
];

export default function Profile() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'theme' | 'notifications'>('profile');
  const [className, setClassName] = useState(state.user?.className || '');
  const [schoolCode, setSchoolCode] = useState('');

  if (!state.user) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <User className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Войдите в систему</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Для доступа к профилю необходимо авторизоваться</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Профиль</h1>

      {/* User card */}
      <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
            style={{ background: `linear-gradient(135deg, ${state.theme.primaryColor}, ${state.theme.accentColor})` }}>
            {state.user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{state.user.name}</h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{state.user.email}</p>
            <div className="flex gap-2 mt-2">
              {state.user.roles.map(role => {
                const Icon = roleIcons[role];
                return (
                  <span key={role} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: state.theme.primaryColor + '15', color: state.theme.primaryColor }}>
                    <Icon className="w-3 h-3" />
                    {roleLabels[role]}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
        {[
          { id: 'profile', label: 'Аккаунт', icon: User },
          { id: 'theme', label: 'Тема', icon: Palette },
          { id: 'notifications', label: 'Уведомления', icon: Bell },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              backgroundColor: activeTab === tab.id ? 'var(--bg-primary)' : 'transparent',
              color: activeTab === tab.id ? state.theme.primaryColor : 'var(--text-muted)',
              boxShadow: activeTab === tab.id ? '0 1px 3px var(--shadow-color)' : 'none',
            }}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'profile' && (
        <div className="space-y-4 animate-fade-in">
          {/* Role switching */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Shield className="w-4 h-4" /> Переключение роли
            </h3>
            <div className="space-y-2">
              {state.user.roles.map(role => {
                const Icon = roleIcons[role];
                const isActive = state.user?.activeRole === role;
                return (
                  <button
                    key={role}
                    onClick={() => dispatch({ type: 'SWITCH_ROLE', payload: role })}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                    style={{
                      backgroundColor: isActive ? state.theme.primaryColor + '15' : 'var(--bg-tertiary)',
                      border: `1px solid ${isActive ? state.theme.primaryColor + '40' : 'var(--border-color)'}`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: isActive ? state.theme.primaryColor : 'var(--text-muted)' }} />
                    <span className="flex-1 text-left text-sm font-medium" style={{ color: isActive ? state.theme.primaryColor : 'var(--text-secondary)' }}>
                      {roleLabels[role]}
                    </span>
                    {isActive && <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: state.theme.primaryColor, color: 'white' }}>Активна</span>}
                    <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Class/School settings */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>Настройки просмотра</h3>
            {(state.user.activeRole === 'student' || state.user.activeRole === 'parent') && (
              <div className="mb-3">
                <label className="text-sm mb-1 block" style={{ color: 'var(--text-muted)' }}>Класс</label>
                <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                >
                  {['5А', '6А', '7А', '7Б', '8А', '8Б', '8В', '9А', '9Б', '10А', '10Б', '11А'].map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="text-sm mb-1 block" style={{ color: 'var(--text-muted)' }}>Код школы</label>
              <input
                type="text"
                value={schoolCode}
                onChange={(e) => setSchoolCode(e.target.value)}
                placeholder="Введите код школы"
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => dispatch({ type: 'LOGOUT' })}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#ff6b6b20', color: '#ff6b6b', border: '1px solid #ff6b6b40' }}
          >
            <LogOut className="w-4 h-4" />
            Выйти из аккаунта
          </button>
        </div>
      )}

      {activeTab === 'theme' && (
        <div className="space-y-4 animate-fade-in">
          {/* Presets */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>Пресеты тем</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {presetThemes.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => dispatch({ type: 'SET_THEME', payload: { mode: preset.mode, primaryColor: preset.primary, accentColor: preset.accent } })}
                  className="p-3 rounded-lg text-left transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    border: `2px solid ${state.theme.primaryColor === preset.primary && state.theme.mode === preset.mode ? preset.primary : 'var(--border-color)'}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {preset.mode === 'dark' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                    <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{preset.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.primary }} />
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.accent }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom colors */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>Свои цвета</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block" style={{ color: 'var(--text-muted)' }}>Основной цвет</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={state.theme.primaryColor}
                    onChange={(e) => dispatch({ type: 'SET_THEME', payload: { primaryColor: e.target.value } })}
                    className="w-10 h-10 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={state.theme.primaryColor}
                    onChange={(e) => dispatch({ type: 'SET_THEME', payload: { primaryColor: e.target.value } })}
                    className="flex-1 px-3 py-2 rounded-lg text-sm font-mono"
                    style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm mb-1 block" style={{ color: 'var(--text-muted)' }}>Акцентный цвет</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={state.theme.accentColor}
                    onChange={(e) => dispatch({ type: 'SET_THEME', payload: { accentColor: e.target.value } })}
                    className="w-10 h-10 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={state.theme.accentColor}
                    onChange={(e) => dispatch({ type: 'SET_THEME', payload: { accentColor: e.target.value } })}
                    className="flex-1 px-3 py-2 rounded-lg text-sm font-mono"
                    style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mode toggle */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>Режим</h3>
            <div className="flex gap-2">
              <button
                onClick={() => dispatch({ type: 'SET_THEME', payload: { mode: 'light' } })}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: state.theme.mode === 'light' ? state.theme.primaryColor : 'var(--bg-tertiary)',
                  color: state.theme.mode === 'light' ? 'white' : 'var(--text-secondary)',
                }}
              >
                <Sun className="w-4 h-4" /> Светлая
              </button>
              <button
                onClick={() => dispatch({ type: 'SET_THEME', payload: { mode: 'dark' } })}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: state.theme.mode === 'dark' ? state.theme.primaryColor : 'var(--bg-tertiary)',
                  color: state.theme.mode === 'dark' ? 'white' : 'var(--text-secondary)',
                }}
              >
                <Moon className="w-4 h-4" /> Тёмная
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="p-4 rounded-xl animate-fade-in" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>Уведомления</h3>
          <div className="space-y-3">
            {[
              { label: 'Изменения в расписании', desc: 'Уведомлять при изменении расписания' },
              { label: 'Замены уроков', desc: 'Уведомлять о заменах на день' },
              { label: 'Новые объявления', desc: 'Объявления от составителя' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={i === 0} className="sr-only peer" />
                  <div className="w-11 h-6 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-white after:bg-gray-400"
                    style={{ backgroundColor: 'var(--border-color)' }} />
                </label>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 p-3 rounded-lg" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)' }}>
            💡 Уведомления пока работают в демо-режиме. Полноценная система уведомлений будет доступна после подключения к серверу.
          </p>
        </div>
      )}
    </div>
  );
}
