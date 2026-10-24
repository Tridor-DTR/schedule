import { useState } from 'react';
import { useApp } from '../store/AppContext';
import {
  Building, Mail, Phone, User, Send, CheckCircle2,
  ArrowLeft, Info, FileText, Users, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Apply() {
  const { state, dispatch } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: 'school',
    contactName: '',
    email: '',
    phone: '',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    dispatch({
      type: 'ADD_APPLICATION',
      payload: {
        id: 'app-' + Date.now(),
        name: form.name,
        type: form.type,
        email: form.email,
        phone: form.phone,
        status: 'pending',
        submittedAt: new Date().toISOString().split('T')[0],
        contactName: form.contactName,
      },
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 animate-fade-in">
        <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: '#69db7c' }} />
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Заявка отправлена!</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          Ваша заявка на регистрацию учебного заведения принята и будет рассмотрена в ближайшее время.
          Статус будет отправлен на указанный email.
        </p>
        <div className="p-4 rounded-xl mb-6 text-left" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h3 className="font-medium text-sm mb-2" style={{ color: 'var(--text-primary)' }}>Что дальше?</h3>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li className="flex items-start gap-2">
              <span style={{ color: state.theme.primaryColor }}>1.</span>
              Суперадмин рассмотрит вашу заявку
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: state.theme.primaryColor }}>2.</span>
              После одобрения вы получите код для составителя
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: state.theme.primaryColor }}>3.</span>
              Составитель настроит расписание для вашего заведения
            </li>
          </ul>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
        >
          <ArrowLeft className="w-4 h-4" /> На главную
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Link to="/" className="inline-flex items-center gap-1 text-sm mb-6 transition-all hover:opacity-70" style={{ color: state.theme.primaryColor }}>
        <ArrowLeft className="w-4 h-4" /> На главную
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Регистрация учебного заведения</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Заполните форму для подачи заявки на подключение к платформе «Фрактал»
        </p>
      </div>

      {/* Info block */}
      <div className="p-4 rounded-xl mb-6 flex items-start gap-3" style={{ backgroundColor: state.theme.primaryColor + '10', border: `1px solid ${state.theme.primaryColor}30` }}>
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: state.theme.primaryColor }} />
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Зачем нужна модерация?</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Проверка заявок необходима для защиты от мошенничества и оптимизации работы системы. 
            Это гарантирует, что каждая школа имеет уникальное название и корректные данные.
          </p>
        </div>
      </div>

      {/* What to prepare */}
      <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <h3 className="font-medium text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <FileText className="w-4 h-4" /> Что подготовить заранее:
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Users, label: 'Список учителей' },
            { icon: Building, label: 'Список кабинетов' },
            { icon: FileText, label: 'Список классов' },
            { icon: Clock, label: 'Шаблон звонков' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <item.icon className="w-4 h-4" style={{ color: state.theme.primaryColor }} />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>Информация о заведении</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                Название учебного заведения *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="МБОУ СОШ №42"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                Тип заведения *
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              >
                <option value="school">Школа</option>
                <option value="gymnasium">Гимназия</option>
                <option value="lyceum">Лицей</option>
                <option value="college">Колледж</option>
                <option value="university">ВУЗ</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                Контактное лицо *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  required
                  value={form.contactName}
                  onChange={(e) => setForm(prev => ({ ...prev, contactName: e.target.value }))}
                  placeholder="Иванов Иван Иванович"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="school@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none"
                    style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                  Телефон
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+7 (999) 123-45-67"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none"
                    style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                Комментарий (необязательно)
              </label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Дополнительная информация..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
                style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{ backgroundColor: state.theme.primaryColor }}
        >
          <Send className="w-4 h-4" /> Отправить заявку
        </button>
      </form>
    </div>
  );
}
