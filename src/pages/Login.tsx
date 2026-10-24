import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp, Role } from '../store/AppContext';
import { GraduationCap, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

const demoUsers = [
  {
    id: 'user-1',
    name: 'Составитель',
    email: 'composer@school.ru',
    roles: ['composer'] as Role[],
    activeRole: 'composer' as Role,
    schoolId: 'school-1',
  },
  {
    id: 'user-2',
    name: 'Ученик 5А',
    email: 'student5a@school.ru',
    roles: ['student'] as Role[],
    activeRole: 'student' as Role,
    schoolId: 'school-1',
    className: '5А',
  },
  {
    id: 'user-3',
    name: 'Суперадмин',
    email: 'admin@fractal.app',
    roles: ['superadmin'] as Role[],
    activeRole: 'superadmin' as Role,
    schoolId: '',
  },
  {
    id: 'user-4',
    name: 'Родитель 9А',
    email: 'parent@school.ru',
    roles: ['parent'] as Role[],
    activeRole: 'parent' as Role,
    schoolId: 'school-1',
    className: '9А',
  },
  {
    id: 'user-5',
    name: 'Ученик 7А',
    email: 'student7a@school.ru',
    roles: ['student'] as Role[],
    activeRole: 'student' as Role,
    schoolId: 'school-1',
    className: '7А',
  },
];

export default function Login() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login
    if (selectedDemo) {
      const demoUser = demoUsers.find(u => u.id === selectedDemo);
      if (demoUser) {
        dispatch({ type: 'LOGIN', payload: demoUser });
        navigate('/schedule');
        return;
      }
    }

    // Find demo user by email
    const foundUser = demoUsers.find(u => u.email === email);
    if (foundUser) {
      dispatch({ type: 'LOGIN', payload: foundUser });
      navigate('/schedule');
    } else if (email && password) {
      // Create new user (demo)
      const newUser = {
        id: 'user-' + Date.now(),
        name: name || email.split('@')[0],
        email,
        roles: ['student'] as Role[],
        activeRole: 'student' as Role,
        schoolId: 'school-1',
        className: '9А',
      };
      dispatch({ type: 'LOGIN', payload: newUser });
      navigate('/schedule');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #5c7cfa, #f06595)' }}>
            <GraduationCap className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Фрактал</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Войдите в систему расписания</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          {/* Tabs */}
          <div className="flex mb-6 rounded-lg overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setMode('login')}
              className="flex-1 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: mode === 'login' ? state.theme.primaryColor : 'transparent',
                color: mode === 'login' ? 'white' : 'var(--text-secondary)',
              }}
            >
              Вход
            </button>
            <button
              onClick={() => setMode('register')}
              className="flex-1 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: mode === 'register' ? state.theme.primaryColor : 'transparent',
                color: mode === 'register' ? 'white' : 'var(--text-secondary)',
              }}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Имя</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none transition-all focus:ring-2"
                    style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', '--tw-ring-color': state.theme.primaryColor } as any}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none transition-all focus:ring-2"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Пароль</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-lg text-sm outline-none transition-all focus:ring-2"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ backgroundColor: state.theme.primaryColor }}
            >
              {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
            <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
              Демо-аккаунты (нажмите для быстрого входа):
            </p>
            <div className="space-y-2">
              {demoUsers.map(user => (
                <button
                  key={user.id}
                  onClick={() => {
                    dispatch({ type: 'LOGIN', payload: user });
                    navigate('/schedule');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all hover:scale-[1.01]"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                >
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs ml-2 px-2 py-0.5 rounded-full" style={{ backgroundColor: state.theme.primaryColor + '20', color: state.theme.primaryColor }}>
                    {user.roles[0] === 'composer' ? 'Составитель' : 
                     user.roles[0] === 'student' ? 'Ученик' :
                     user.roles[0] === 'superadmin' ? 'Суперадмин' : 'Родитель'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
          <Link to="/apply" className="underline hover:no-underline" style={{ color: state.theme.primaryColor }}>
            Подать заявку для учебного заведения
          </Link>
        </p>
      </div>
    </div>
  );
}
