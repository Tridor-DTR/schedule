import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import {
  Calendar, Users, Shield, Smartphone, Palette, Clock,
  ArrowRight, Check, Sparkles, Zap, Globe, Printer
} from 'lucide-react';

export default function Landing() {
  const { state } = useApp();

  const features = [
    {
      icon: Calendar,
      title: 'Удобное расписание',
      description: 'Просмотр расписания на день, неделю, для класса или учителя. Всё в одном месте.',
      color: '#5c7cfa',
    },
    {
      icon: Zap,
      title: 'Мгновенные изменения',
      description: 'Составитель вносит изменения — все видят их сразу. Без скачивания файлов.',
      color: '#f06595',
    },
    {
      icon: Users,
      title: 'Роли и права',
      description: 'Ученики, учителя, родители, составители — у каждого свой удобный интерфейс.',
      color: '#20c997',
    },
    {
      icon: Smartphone,
      title: 'Работает везде',
      description: 'Адаптивный дизайн для любого устройства. PWA для офлайн-просмотра.',
      color: '#fcc419',
    },
    {
      icon: Palette,
      title: 'Кастомизация',
      description: 'Гибкие темы оформления: цвета, шрифты, фоны. Каждый настраивает под себя.',
      color: '#845ef7',
    },
    {
      icon: Shield,
      title: 'Безопасность',
      description: 'Модерация заявок, контроль доступа, защита данных учебных заведений.',
      color: '#ff6b6b',
    },
    {
      icon: Clock,
      title: 'Текущий урок',
      description: 'Автоматическое определение текущего урока с подсветкой в расписании.',
      color: '#3bc9db',
    },
    {
      icon: Globe,
      title: 'Масштабируемость',
      description: 'От одной школы до сотни учебных заведений — платформа растёт вместе с вами.',
      color: '#ff922b',
    },
    {
      icon: Printer,
      title: 'Печать и экспорт',
      description: 'Печатная версия, экспорт в PDF и PNG. Чёрно-белая оптимизация для принтера.',
      color: '#69db7c',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${state.theme.primaryColor} 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, ${state.theme.accentColor} 0%, transparent 50%)`,
        }} />
        
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: state.theme.primaryColor + '15', color: state.theme.primaryColor }}>
            <Sparkles className="w-4 h-4" />
            Современная платформа для расписания
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
            Расписание, которое{' '}
            <span className="bg-clip-text text-transparent" style={{
              backgroundImage: `linear-gradient(135deg, ${state.theme.primaryColor}, ${state.theme.accentColor})`
            }}>
              работает на вас
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Забудьте о неудобных программах и PDF-файлах. Создавайте, просматривайте и управляйте расписанием 
            из любой точки мира — быстро и красиво.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-4 rounded-xl text-white font-medium text-lg transition-all hover:scale-105 shadow-lg"
              style={{ backgroundColor: state.theme.primaryColor, boxShadow: `0 8px 24px ${state.theme.primaryColor}40` }}
            >
              Начать бесплатно
            </Link>
            <Link
              to="/apply"
              className="px-8 py-4 rounded-xl font-medium text-lg transition-all hover:scale-105"
              style={{ border: `2px solid var(--border-color)`, color: 'var(--text-primary)' }}
            >
              Подать заявку для школы
            </Link>
          </div>
        </div>
      </section>

      {/* Demo preview */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid var(--border-color)' }}>
            <div className="p-4 flex items-center gap-2" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-4 text-sm" style={{ color: 'var(--text-muted)' }}>fractal.app/schedule</span>
            </div>
            <div className="p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map((day, i) => (
                  <div key={day} className="text-center text-xs font-medium py-2 rounded"
                    style={{ 
                      backgroundColor: i === (new Date().getDay() || 7) - 1 ? state.theme.primaryColor + '20' : 'var(--bg-tertiary)',
                      color: i === (new Date().getDay() || 7) - 1 ? state.theme.primaryColor : 'var(--text-muted)'
                    }}>
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }).map((_, i) => {
                  const subjects = ['Матем.', 'Рус.яз.', 'Физика', 'История', 'Англ.', 'Литер.', 'Химия', 'Биол.', 'Информ.', 'Физ-ра'];
                  const hasLesson = Math.random() > 0.3;
                  return (
                    <div key={i} className="p-2 rounded-lg text-xs" style={{
                      backgroundColor: hasLesson ? state.theme.primaryColor + '10' : 'var(--bg-tertiary)',
                      border: `1px solid ${hasLesson ? state.theme.primaryColor + '30' : 'var(--border-color)'}`,
                      minHeight: '40px',
                    }}>
                      {hasLesson && (
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {subjects[Math.floor(Math.random() * subjects.length)]}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Всё, что нужно для расписания
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Продуманный функционал для каждого участника учебного процесса
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: feature.color + '15' }}>
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For whom */}
      <section className="py-16 px-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text-primary)' }}>
            Для каждого — своё
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { role: 'Ученик', desc: 'Видишь расписание своего класса. Знаешь, что будет завтра.', emoji: '📚' },
              { role: 'Учитель', desc: 'Твоё личное расписание всегда под рукой. Никаких окошек.', emoji: '👨‍🏫' },
              { role: 'Составитель', desc: 'Создавай и меняй расписание с любого устройства за секунды.', emoji: '⚡' },
              { role: 'Родитель', desc: 'Всегда в курсе расписания ребёнка. Удобно и понятно.', emoji: '👨‍👩‍👧' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{item.role}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Готовы попробовать?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            Подайте заявку на регистрацию вашего учебного заведения или войдите, если у вас уже есть доступ.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
              style={{ backgroundColor: state.theme.primaryColor }}
            >
              Войти в систему <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/schedule"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
              style={{ border: `2px solid ${state.theme.primaryColor}40`, color: state.theme.primaryColor }}
            >
              Демо-режим <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/apply"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
              style={{ border: `2px solid var(--border-color)`, color: 'var(--text-primary)' }}
            >
              Подать заявку
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center" style={{ borderTop: '1px solid var(--border-color)' }}>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          © 2025 Фрактал — Современная платформа для расписания учебных заведений
        </p>
      </footer>
    </div>
  );
}
