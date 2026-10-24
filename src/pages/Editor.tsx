import { useState } from 'react';
import { useApp, Lesson } from '../store/AppContext';
import {
  LayoutGrid, Plus, AlertTriangle, Check, Save, Play,
  Clock, Users, Building, BookOpen, Trash2, Edit3,
  ChevronDown, Sparkles, AlertCircle
} from 'lucide-react';

import { schoolClasses, schoolTeachers, schoolRooms } from '../data/scheduleData';

const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const classes = schoolClasses;
const teachers = schoolTeachers;
const subjects = ['Математика', 'Алгебра', 'Геометрия', 'Русский язык', 'Литература', 'Физика', 'Химия', 'Биология', 'История', 'Обществознание', 'География', 'Английский язык', 'Информатика', 'Физкультура', 'Технология', 'ОБЗР', 'Турецкий язык', 'род.яз', 'Род.лит', 'Музыка', 'ИЗО', 'Классный час', 'Разговоры о важном', 'Россия — мои горизонты', 'Китап time', 'Вероятность и статистика', 'Джиу-джитсу', 'Олимп. матем.'];
const rooms = schoolRooms;

export default function Editor() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'grid' | 'teachers' | 'settings' | 'warnings'>('grid');
  const [selectedDay, setSelectedDay] = useState(1);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; slot: number } | null>(null);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);

  // New lesson form
  const [newLesson, setNewLesson] = useState({
    subject: '', teacher: '', room: '', className: '9А', group: '',
  });

  if (!state.user || !state.user.roles.includes('composer')) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <LayoutGrid className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Доступ только для составителя</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Переключитесь на роль «Составитель» в профиле</p>
      </div>
    );
  }

  const daySlots = state.timeSlots.find(d => d.dayOfWeek === selectedDay)?.slots || [];
  const lessonsForDay = state.schedule.filter(l => l.dayOfWeek === selectedDay);

  const getLessonsForSlot = (day: number, slot: number) => {
    return state.schedule.filter(l => l.dayOfWeek === day && l.timeSlot === slot);
  };

  const handleAddLesson = () => {
    if (!newLesson.subject || !newLesson.teacher || !selectedSlot) return;
    
    const lesson: Lesson = {
      id: Date.now().toString(),
      subject: newLesson.subject,
      teacher: newLesson.teacher,
      room: newLesson.room,
      className: newLesson.className,
      group: newLesson.group || undefined,
      dayOfWeek: selectedSlot.day,
      timeSlot: selectedSlot.slot,
      tags: [],
    };

    // Check for warnings
    const conflicts = state.schedule.filter(l =>
      l.dayOfWeek === selectedSlot.day && l.timeSlot === selectedSlot.slot &&
      (l.teacher === newLesson.teacher || l.room === newLesson.room)
    );

    if (conflicts.length > 0) {
      conflicts.forEach(c => {
        if (c.teacher === newLesson.teacher) {
          dispatch({
            type: 'ADD_WARNING',
            payload: {
              id: Date.now().toString() + '-t',
              type: 'teacher',
              message: `Учитель ${newLesson.teacher} уже занят в это время (${c.subject}, ${c.className})`,
              lessonId: lesson.id,
            },
          });
        }
        if (c.room === newLesson.room) {
          dispatch({
            type: 'ADD_WARNING',
            payload: {
              id: Date.now().toString() + '-r',
              type: 'room',
              message: `Кабинет ${newLesson.room} уже занят в это время (${c.subject}, ${c.className})`,
              lessonId: lesson.id,
            },
          });
        }
      });
    }

    dispatch({ type: 'ADD_LESSON', payload: lesson });
    setShowAddModal(false);
    setNewLesson({ subject: '', teacher: '', room: '', className: '9А', group: '' });
  };

  const handleDeleteLesson = (id: string) => {
    dispatch({ type: 'DELETE_LESSON', payload: id });
  };

  const handlePublish = () => {
    setShowPublishConfirm(false);
    // In real app, this would sync to Supabase
    alert('✅ Расписание опубликовано! Все пользователи увидят изменения.');
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Составление расписания</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Создавайте и редактируйте расписание
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {state.warnings.length > 0 && (
            <button
              onClick={() => setActiveTab('warnings')}
              className="px-3 py-2 rounded-lg text-sm flex items-center gap-1"
              style={{ backgroundColor: '#fcc41920', color: '#f59f00', border: '1px solid #fcc41940' }}
            >
              <AlertTriangle className="w-4 h-4" />
              {state.warnings.length} предупрежд.
            </button>
          )}
          <button
            onClick={() => setShowPublishConfirm(true)}
            className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 text-white transition-all hover:opacity-90"
            style={{ backgroundColor: state.theme.primaryColor }}
          >
            <Play className="w-4 h-4" /> Опубликовать
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl overflow-x-auto" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
        {[
          { id: 'grid', label: 'Сетка', icon: LayoutGrid },
          { id: 'teachers', label: 'Учителя', icon: Users },
          { id: 'settings', label: 'Настройки', icon: Clock },
          { id: 'warnings', label: `Предупреждения (${state.warnings.length})`, icon: AlertTriangle },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
            style={{
              backgroundColor: activeTab === tab.id ? 'var(--bg-primary)' : 'transparent',
              color: activeTab === tab.id ? state.theme.primaryColor : 'var(--text-muted)',
              boxShadow: activeTab === tab.id ? '0 1px 3px var(--shadow-color)' : 'none',
            }}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid view */}
      {activeTab === 'grid' && (
        <div>
          {/* Day selector */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {dayNames.map((day, i) => (
              <button
                key={i}
                onClick={() => setSelectedDay(i + 1)}
                className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  backgroundColor: selectedDay === i + 1 ? state.theme.primaryColor : 'var(--bg-secondary)',
                  color: selectedDay === i + 1 ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${selectedDay === i + 1 ? state.theme.primaryColor : 'var(--border-color)'}`,
                }}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Class selector */}
          <div className="flex gap-2 mb-4">
            {classes.map(cls => (
              <button
                key={cls}
                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
              >
                {cls}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="space-y-2">
            {daySlots.filter(s => !s.isBreak).map(slot => {
              const slotLessons = getLessonsForSlot(selectedDay, slot.id);
              return (
                <div
                  key={slot.id}
                  className="flex items-stretch gap-2 p-2 rounded-lg"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                >
                  {/* Time */}
                  <div className="w-20 flex-shrink-0 text-center py-2">
                    <div className="text-xs font-medium" style={{ color: state.theme.primaryColor }}>{slot.label}</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{slot.startTime}–{slot.endTime}</div>
                  </div>

                  {/* Lessons */}
                  <div className="flex-1 flex gap-2 flex-wrap">
                    {slotLessons.map(lesson => (
                      <div
                        key={lesson.id}
                        className="flex-1 min-w-[180px] p-2 rounded-lg relative group"
                        style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                      >
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{lesson.subject}</div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {lesson.teacher} • {lesson.room} • {lesson.className}
                        </div>
                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="p-1 rounded bg-red-500/20 text-red-500 hover:bg-red-500/30"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setSelectedSlot({ day: selectedDay, slot: slot.id });
                        setShowAddModal(true);
                      }}
                      className="flex-1 min-w-[100px] p-2 rounded-lg border-2 border-dashed flex items-center justify-center gap-1 text-xs transition-all hover:scale-[1.02]"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
                    >
                      <Plus className="w-3 h-3" /> Добавить
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Teachers view */}
      {activeTab === 'teachers' && (
        <div className="space-y-3">
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            Таблица доступности учителей. Отметьте время, когда учитель может вести уроки.
          </p>
          {teachers.slice(0, 5).map(teacher => (
            <div key={teacher} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                  style={{ backgroundColor: state.theme.primaryColor }}>
                  {teacher.charAt(0)}
                </div>
                <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{teacher}</span>
              </div>
              <div className="grid grid-cols-6 gap-1">
                {dayNames.map((day, dayIdx) => (
                  <div key={dayIdx}>
                    <div className="text-xs text-center mb-1" style={{ color: 'var(--text-muted)' }}>{day.slice(0, 2)}</div>
                    <div className="space-y-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(slot => {
                        const isAvailable = Math.random() > 0.3;
                        return (
                          <div
                            key={slot}
                            className="w-full h-6 rounded text-xs flex items-center justify-center cursor-pointer transition-all"
                            style={{
                              backgroundColor: isAvailable ? state.theme.primaryColor + '20' : 'var(--bg-tertiary)',
                              color: isAvailable ? state.theme.primaryColor : 'var(--text-muted)',
                              border: `1px solid ${isAvailable ? state.theme.primaryColor + '40' : 'var(--border-color)'}`,
                            }}
                            title={`${day}, урок ${slot}`}
                          >
                            {slot}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Building className="w-4 h-4" /> Кабинеты
            </h3>
            <div className="flex flex-wrap gap-2">
              {rooms.map(room => (
                <span key={room} className="px-3 py-1 rounded-lg text-sm" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  {room}
                </span>
              ))}
              <button className="px-3 py-1 rounded-lg text-sm flex items-center gap-1" style={{ color: state.theme.primaryColor }}>
                <Plus className="w-3 h-3" /> Добавить
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <BookOpen className="w-4 h-4" /> Предметы
            </h3>
            <div className="flex flex-wrap gap-2">
              {subjects.map(subject => (
                <span key={subject} className="px-3 py-1 rounded-lg text-sm" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  {subject}
                </span>
              ))}
              <button className="px-3 py-1 rounded-lg text-sm flex items-center gap-1" style={{ color: state.theme.primaryColor }}>
                <Plus className="w-3 h-3" /> Добавить
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Sparkles className="w-4 h-4" /> Автогенерация
            </h3>
            <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
              Автоматическое составление расписания с учётом ограничений, часов в неделю и СанПиН.
            </p>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2"
              style={{ backgroundColor: state.theme.accentColor }}>
              <Sparkles className="w-4 h-4" /> Сгенерировать расписание
            </button>
          </div>
        </div>
      )}

      {/* Warnings */}
      {activeTab === 'warnings' && (
        <div className="space-y-3">
          {state.warnings.length === 0 ? (
            <div className="text-center py-12">
              <Check className="w-12 h-12 mx-auto mb-3" style={{ color: '#69db7c' }} />
              <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Нет предупреждений</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Все уроки расставлены без конфликтов</p>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-lg flex items-center gap-2" style={{ backgroundColor: '#fcc41915', border: '1px solid #fcc41940' }}>
                <AlertCircle className="w-4 h-4" style={{ color: '#f59f00' }} />
                <span className="text-sm" style={{ color: '#f59f00' }}>
                  {state.warnings.length} предупреждений. Расписание можно опубликовать, но рекомендуется исправить конфликты.
                </span>
              </div>
              {state.warnings.map(warning => (
                <div key={warning.id} className="p-3 rounded-lg flex items-start gap-3"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#f59f00' }} />
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{warning.message}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
                      style={{ backgroundColor: '#fcc41920', color: '#f59f00' }}>
                      {warning.type === 'teacher' ? 'Учитель' : warning.type === 'room' ? 'Кабинет' : 'Конфликт'}
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* Add lesson modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowAddModal(false)}>
          <div className="w-full max-w-md rounded-2xl p-6 animate-fade-in" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
            onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Добавить урок</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm mb-1 block" style={{ color: 'var(--text-muted)' }}>Предмет</label>
                <select
                  value={newLesson.subject}
                  onChange={(e) => setNewLesson(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                >
                  <option value="">Выбрать...</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm mb-1 block" style={{ color: 'var(--text-muted)' }}>Учитель</label>
                <select
                  value={newLesson.teacher}
                  onChange={(e) => setNewLesson(prev => ({ ...prev, teacher: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                >
                  <option value="">Выбрать...</option>
                  {teachers.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm mb-1 block" style={{ color: 'var(--text-muted)' }}>Кабинет</label>
                <select
                  value={newLesson.room}
                  onChange={(e) => setNewLesson(prev => ({ ...prev, room: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                >
                  <option value="">Выбрать...</option>
                  {rooms.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm mb-1 block" style={{ color: 'var(--text-muted)' }}>Класс</label>
                <select
                  value={newLesson.className}
                  onChange={(e) => setNewLesson(prev => ({ ...prev, className: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                >
                  {classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm mb-1 block" style={{ color: 'var(--text-muted)' }}>Группа (необязательно)</label>
                <input
                  type="text"
                  value={newLesson.group}
                  onChange={(e) => setNewLesson(prev => ({ ...prev, group: e.target.value }))}
                  placeholder="Например: 1 группа"
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
              >
                Отмена
              </button>
              <button
                onClick={handleAddLesson}
                className="flex-1 py-2 rounded-lg text-sm font-medium text-white"
                style={{ backgroundColor: state.theme.primaryColor }}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish confirmation */}
      {showPublishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowPublishConfirm(false)}>
          <div className="w-full max-w-sm rounded-2xl p-6 animate-fade-in text-center" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
            onClick={e => e.stopPropagation()}>
            {state.warnings.length > 0 ? (
              <>
                <AlertTriangle className="w-12 h-12 mx-auto mb-3" style={{ color: '#f59f00' }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Есть предупреждения</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                  У вас {state.warnings.length} предупреждений. Вы уверены, что хотите опубликовать расписание с несостыковками?
                </p>
              </>
            ) : (
              <>
                <Check className="w-12 h-12 mx-auto mb-3" style={{ color: '#69db7c' }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Публикация расписания</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                  Все пользователи увидят изменения. Продолжить?
                </p>
              </>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setShowPublishConfirm(false)}
                className="flex-1 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
              >
                Отмена
              </button>
              <button
                onClick={handlePublish}
                className="flex-1 py-2 rounded-lg text-sm font-medium text-white"
                style={{ backgroundColor: state.warnings.length > 0 ? '#f59f00' : state.theme.primaryColor }}
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
