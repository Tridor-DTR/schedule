import { useState, useMemo } from 'react';
import { useApp, Lesson } from '../store/AppContext';
import { schoolClasses } from '../data/scheduleData';
import {
  Calendar, Clock, Filter, ChevronLeft, ChevronRight,
  Users, Printer, Grid3x3, BookOpen, ChevronDown
} from 'lucide-react';
import FilterBuilder, { FilterBlock } from '../components/FilterBuilder';

const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const dayNamesShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

// Цвета предметов (расширенный список)
const subjectColors: Record<string, string> = {
  'Математика': '#5c7cfa', 'Алгебра': '#5c7cfa', 'Геометрия': '#4263eb',
  'Математика (эл)': '#5c7cfa', 'Математика (1)': '#5c7cfa',
  'Вероятность и статистика': '#748ffc',
  'Русский язык': '#20c997', 'Русский язык (1)': '#20c997',
  'Литература': '#12b886', 'Род.лит': '#12b886', 'Род.лит.': '#12b886',
  'Род.лит(тат)': '#12b886',
  'Физика': '#fcc419', 'Химия': '#ff922b',
  'Биология': '#51cf66', 'История': '#cc5de8',
  'Обществознание': '#cc5de8', 'География': '#22b8cf',
  'Английский язык': '#f06595', 'Английский язык (1)': '#f06595',
  'Английский (1)': '#f06595',
  'Информатика': '#748ffc', 'Информатика (1)': '#748ffc',
  'Физкультура': '#ff6b6b', 'Физкультура (1)': '#ff6b6b',
  'Технология': '#845ef7', 'ОБЗР': '#e8590c',
  'Музыка': '#c084fc', 'ИЗО': '#fb923c',
  'Турецкий язык': '#20c997', 'Тур.яз': '#20c997', 'Тур.яз (1)': '#20c997',
  'род.яз': '#868e96', 'род.яз(тат)': '#868e96', 'род.яз(рус)': '#868e96',
  'Классный час': '#fab005', 'Разговоры о важном': '#fab005',
  'Россия — мои горизонты': '#fd7e14',
  'Китап time': '#e599f7', 'Олимп. матем.': '#5c7cfa',
  'Джиу-джитсу': '#ff6b6b', 'Линейка': '#adb5bd',
};

function getSubjectColor(subject: string): string {
  if (subjectColors[subject]) return subjectColors[subject];
  const s = subject.toLowerCase();
  if (s.includes('матем') || s.includes('алгебр') || s.includes('геометр')) return '#5c7cfa';
  if (s.includes('русск') || s.includes('литер') || s.includes('род.лит')) return '#20c997';
  if (s.includes('физ')) return '#fcc419';
  if (s.includes('хим')) return '#ff922b';
  if (s.includes('биол')) return '#51cf66';
  if (s.includes('истор') || s.includes('обществ')) return '#cc5de8';
  if (s.includes('геогр')) return '#22b8cf';
  if (s.includes('англ')) return '#f06595';
  if (s.includes('информ')) return '#748ffc';
  if (s.includes('физ-ра') || s.includes('джоу') || s.includes('джиу')) return '#ff6b6b';
  if (s.includes('технол')) return '#845ef7';
  if (s.includes('тур') || s.includes('род.яз')) return '#20c997';
  if (s.includes('изо') || s.includes('музык')) return '#fb923c';
  if (s.includes('класс') || s.includes('разговор')) return '#fab005';
  if (s.includes('линейк')) return '#adb5bd';
  if (s.includes('обед')) return '#868e96';
  return '#868e96';
}

// Сокращение названия предмета для таблицы
function shortSubject(subject: string): string {
  const map: Record<string, string> = {
    'Математика': 'Матем', 'Алгебра': 'Алг', 'Геометрия': 'Геом',
    'Русский язык': 'Рус.яз', 'Литература': 'Лит-ра',
    'Английский язык': 'Англ', 'Физкультура': 'Физ-ра',
    'Информатика': 'Инф', 'Обществознание': 'Общ',
    'Разговоры о важном': 'Разг', 'Классный час': 'Кл.час',
    'Россия — мои горизонты': 'РМГ', 'Вероятность и статистика': 'ВерСтат',
    'Джиу-джитсу': 'Джиу', 'Олимп. матем.': 'Олимп',
    'Китап time': 'Китап',
  };
  if (map[subject]) return map[subject];
  const s = subject.toLowerCase();
  if (s.includes('матем')) return 'Матем';
  if (s.includes('русск')) return 'Рус.яз';
  if (s.includes('литер')) return 'Лит-ра';
  if (s.includes('англ')) return 'Англ';
  if (s.includes('физ-ра')) return 'Физ-ра';
  if (s.includes('информ')) return 'Инф';
  if (s.includes('технол')) return 'Техн';
  if (s.includes('род.яз')) return 'Род.яз';
  if (s.includes('род.лит')) return 'Род.лит';
  if (s.includes('тур.яз')) return 'Тур.яз';
  if (subject.length > 10) return subject.slice(0, 10) + '.';
  return subject;
}

export default function Schedule() {
  const { state, dispatch } = useApp();
  const [viewType, setViewType] = useState<'general-day' | 'general-week' | 'class-week' | 'class-day'>('general-day');
  const [selectedClass, setSelectedClass] = useState('5А');
  const [showFilters, setShowFilters] = useState(false);
  const [filterBlocks, setFilterBlocks] = useState<FilterBlock[]>([]);

  const classes = schoolClasses;
  const teachers = useMemo(() => [...new Set(state.schedule.filter(l => l.teacher).map(l => l.teacher))].sort(), [state.schedule]);
  const subjects = useMemo(() => [...new Set(state.schedule.filter(l => !l.isBreak && !l.isAssembly).map(l => l.subject))].sort(), [state.schedule]);
  const rooms = useMemo(() => [...new Set(state.schedule.filter(l => l.room).map(l => l.room))].sort(), [state.schedule]);
  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  const today = new Date().getDay() || 7;

  const filteredLessons = useMemo(() => {
    let lessons = state.schedule;
    if (viewType === 'class-day' || viewType === 'class-week') {
      lessons = lessons.filter(l => l.className === selectedClass);
    }
    if (filterBlocks.length > 0) {
      lessons = lessons.filter(lesson => {
        return filterBlocks.every(block => {
          let match = false;
          switch (block.type) {
            case 'teacher': match = lesson.teacher === block.value; break;
            case 'room': match = lesson.room === block.value; break;
            case 'class': match = lesson.className === block.value; break;
            case 'day': match = days[lesson.dayOfWeek - 1] === block.value; break;
            default: match = true;
          }
          return block.type === 'operator' || block.type === 'parenthesis' ? true : match;
        });
      });
    }
    return lessons;
  }, [state.schedule, viewType, selectedClass, filterBlocks, days]);

  const daySchedule = state.timeSlots.find(d => d.dayOfWeek === state.selectedDay);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Расписание</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {viewType === 'general-day' && `Общее на ${dayNames[state.selectedDay - 1]}`}
            {viewType === 'class-day' && `${selectedClass} • ${dayNames[state.selectedDay - 1]}`}
            {viewType === 'class-week' && `${selectedClass} • Неделя`}
          </p>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {/* View type selector */}
          <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            <button
              onClick={() => setViewType('general-day')}
              className="px-3 py-2 text-sm flex items-center gap-1.5 transition-colors"
              style={{
                backgroundColor: viewType === 'general-day' ? state.theme.primaryColor : 'transparent',
                color: viewType === 'general-day' ? 'white' : 'var(--text-secondary)',
              }}
              title="Общее расписание на день"
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="hidden sm:inline">Общее / день</span>
            </button>
            <button
              onClick={() => setViewType('general-week')}
              className="px-3 py-2 text-sm flex items-center gap-1.5 transition-colors"
              style={{
                backgroundColor: viewType === 'general-week' ? state.theme.primaryColor : 'transparent',
                color: viewType === 'general-week' ? 'white' : 'var(--text-secondary)',
              }}
              title="Общее расписание на неделю"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Общее / неделя</span>
            </button>
            <button
              onClick={() => setViewType('class-day')}
              className="px-3 py-2 text-sm flex items-center gap-1.5 transition-colors"
              style={{
                backgroundColor: viewType === 'class-day' ? state.theme.primaryColor : 'transparent',
                color: viewType === 'class-day' ? 'white' : 'var(--text-secondary)',
              }}
              title="Расписание класса на день"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Класс / день</span>
            </button>
            <button
              onClick={() => setViewType('class-week')}
              className="px-3 py-2 text-sm flex items-center gap-1.5 transition-colors"
              style={{
                backgroundColor: viewType === 'class-week' ? state.theme.primaryColor : 'transparent',
                color: viewType === 'class-week' ? 'white' : 'var(--text-secondary)',
              }}
              title="Расписание класса на неделю"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Класс / неделя</span>
            </button>
          </div>

          {/* Filter button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-2 rounded-xl text-sm flex items-center gap-1.5 transition-colors"
            style={{
              backgroundColor: showFilters ? state.theme.primaryColor + '20' : 'var(--bg-secondary)',
              color: showFilters ? state.theme.primaryColor : 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
            }}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Фильтры</span>
            {filterBlocks.length > 0 && (
              <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center text-white"
                style={{ backgroundColor: state.theme.primaryColor }}>
                {filterBlocks.length}
              </span>
            )}
          </button>

          <button
            onClick={() => window.print()}
            className="px-3 py-2 rounded-xl text-sm flex items-center gap-1.5 transition-colors"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="mb-5">
          <FilterBuilder
            blocks={filterBlocks}
            onChange={setFilterBlocks}
            teachers={teachers}
            classes={classes}
            rooms={rooms}
            days={days}
            theme={state.theme}
          />
        </div>
      )}

      {/* Day selector */}
      {(viewType === 'general-day' || viewType === 'class-day') && (
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => dispatch({ type: 'SET_SELECTED_DAY', payload: state.selectedDay > 1 ? state.selectedDay - 1 : 6 })}
            className="p-2 rounded-lg hover:opacity-80"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1 flex-1 justify-center">
            {dayNamesShort.map((day, i) => (
              <button
                key={i}
                onClick={() => dispatch({ type: 'SET_SELECTED_DAY', payload: i + 1 })}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: state.selectedDay === i + 1 ? state.theme.primaryColor : 'var(--bg-secondary)',
                  color: state.selectedDay === i + 1 ? 'white' : 'var(--text-secondary)',
                }}
              >
                {day}
              </button>
            ))}
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_SELECTED_DAY', payload: state.selectedDay < 6 ? state.selectedDay + 1 : 1 })}
            className="p-2 rounded-lg hover:opacity-80"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Class selector */}
      {(viewType === 'class-day' || viewType === 'class-week') && (
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-2">
          {classes.map(cls => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
              style={{
                backgroundColor: selectedClass === cls ? state.theme.primaryColor : 'var(--bg-secondary)',
                color: selectedClass === cls ? 'white' : 'var(--text-secondary)',
                border: `1px solid ${selectedClass === cls ? state.theme.primaryColor : 'var(--border-color)'}`,
              }}
            >
              {cls}
            </button>
          ))}
        </div>
      )}

      {/* Main content */}
      {viewType === 'general-day' && (
        <GeneralDayView
          dayOfWeek={state.selectedDay}
          daySchedule={daySchedule}
          lessons={filteredLessons}
          classes={classes}
          theme={state.theme}
          filterBlocks={filterBlocks}
          allRooms={rooms}
        />
      )}
      {viewType === 'general-week' && (
        <GeneralWeekView
          lessons={filteredLessons}
          classes={classes}
          timeSlots={state.timeSlots}
          today={today}
          theme={state.theme}
          filterBlocks={filterBlocks}
          allRooms={rooms}
        />
      )}
      {viewType === 'class-day' && (
        <ClassDayView
          dayOfWeek={state.selectedDay}
          daySchedule={daySchedule}
          lessons={filteredLessons.filter(l => l.className === selectedClass)}
          theme={state.theme}
          filterBlocks={filterBlocks}
        />
      )}
      {viewType === 'class-week' && (
        <ClassWeekView
          lessons={filteredLessons.filter(l => l.className === selectedClass)}
          timeSlots={state.timeSlots}
          today={today}
          theme={state.theme}
          filterBlocks={filterBlocks}
        />
      )}

      {/* Bell schedule */}
      <div className="mt-8 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <h3 className="font-medium flex items-center gap-2 mb-3" style={{ color: 'var(--text-primary)' }}>
          <Clock className="w-4 h-4" /> Расписание звонков — {dayNames[state.selectedDay - 1]}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {daySchedule?.slots.map((slot: any) => (
            <div key={slot.id} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <span className="font-medium" style={{ color: slot.isBreak ? '#868e96' : state.theme.primaryColor }}>
                {slot.isBreak ? '🍽️' : slot.label}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>{slot.startTime}–{slot.endTime}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ ОБЩЕЕ РАСПИСАНИЕ НА ДЕНЬ ============
function GeneralDayView({ dayOfWeek, daySchedule, lessons, classes, theme, filterBlocks, allRooms }: any) {
  const slots = daySchedule?.slots || [];

  const isHighlighted = (lesson: Lesson) => {
    if (filterBlocks.length === 0) return false;
    return filterBlocks.some((block: any) => {
      switch (block.type) {
        case 'subject': return lesson.subject === block.value;
        case 'teacher': return lesson.teacher === block.value;
        case 'room': return lesson.room === block.value;
        default: return false;
      }
    });
  };

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: '1000px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <th className="p-3 text-left text-xs font-semibold sticky left-0 z-10"
                style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)', minWidth: '140px', borderRight: '1px solid var(--border-color)' }}>
                <Clock className="w-4 h-4 inline mr-1" />
                Время
              </th>
              {classes.map((cls: string) => (
                <th key={cls} className="p-2 text-center text-sm font-semibold"
                  style={{ color: 'var(--text-primary)', minWidth: '110px', borderRight: '1px solid var(--border-color)' }}>
                  <span className="px-2 py-1 rounded-md inline-block" style={{ backgroundColor: theme.primaryColor + '15', color: theme.primaryColor }}>
                    {cls}
                  </span>
                </th>
              ))}
              <th className="p-2 text-center text-xs font-semibold"
                style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)', minWidth: '150px' }}>
                Пустые кабинеты
              </th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot: any) => {
              const isBreak = slot.isBreak;
              return (
                <tr key={slot.id} style={{
                  backgroundColor: isBreak ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                  borderBottom: '1px solid var(--border-color)',
                }}>
                  {/* Time cell */}
                  <td className="p-2 sticky left-0 z-10" style={{
                    backgroundColor: isBreak ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                    borderRight: '2px solid var(--border-color)',
                    verticalAlign: 'top',
                  }}>
                    <div className="text-xs font-bold" style={{ color: isBreak ? '#868e96' : theme.primaryColor }}>
                      {slot.startTime}–{slot.endTime}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {isBreak ? '🍽️ Обед' : slot.label}
                    </div>
                  </td>
                  
                  {/* Class cells */}
                  {classes.map((cls: string) => {
                    const cellLessons = lessons.filter((l: Lesson) => 
                      l.className === cls && l.dayOfWeek === dayOfWeek && l.timeSlot === slot.id && !l.isBreak
                    );
                    
                    if (isBreak) {
                      return (
                        <td key={cls} className="p-1 text-center" style={{ borderRight: '1px solid var(--border-color)' }}>
                          <span className="text-xs" style={{ color: '#868e96' }}>🍽️</span>
                        </td>
                      );
                    }
                    
                    return (
                      <td key={cls} className="p-1" style={{ borderRight: '1px solid var(--border-color)', verticalAlign: 'top' }}>
                        {cellLessons.length > 0 ? (
                          <div className="space-y-0.5">
                            {cellLessons.map((lesson: Lesson) => {
                              const color = getSubjectColor(lesson.subject);
                              const highlighted = isHighlighted(lesson);
                              return (
                                <div
                                  key={lesson.id}
                                  className="p-1.5 rounded-md text-xs transition-all hover:scale-[1.02] cursor-pointer"
                                  style={{
                                    backgroundColor: color + '18',
                                    borderLeft: `3px solid ${color}`,
                                    outline: highlighted ? `2px solid ${theme.accentColor}` : undefined,
                                  }}
                                  title={`${lesson.subject}${lesson.group ? ` (гр.${lesson.group})` : ''}\n${lesson.teacher}\nКабинет: ${lesson.room}\n${slot?.startTime || ''}–${slot?.endTime || ''}`}
                                >
                                  <div className="font-semibold leading-tight" style={{ color }}>
                                    {lesson.group && <span className="opacity-70 text-[10px] mr-0.5">гр{lesson.group}</span>}
                                    {shortSubject(lesson.subject)}
                                  </div>
                                  <div className="text-[10px] leading-tight mt-0.5 opacity-80" style={{ color: 'var(--text-secondary)' }}>
                                    {lesson.teacher?.split(' ').slice(0, 2).join(' ')}
                                    {lesson.room && <span className="ml-1 opacity-60">• {lesson.room}</span>}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-1.5 text-center text-xs" style={{ color: 'var(--text-muted)' }}>—</div>
                        )}
                      </td>
                    );
                  })}
                  {/* Колонка "Пустые кабинеты" */}
                  <td className="p-2" style={{
                    backgroundColor: 'var(--bg-secondary)',
                    verticalAlign: 'top',
                  }}>
                    {(() => {
                      const occupiedRooms = new Set<string>();
                      lessons.forEach((l: Lesson) => {
                        if (l.dayOfWeek === dayOfWeek && l.timeSlot === slot.id && l.room) {
                          occupiedRooms.add(l.room);
                        }
                      });
                      
                      const freeRooms = allRooms.filter((room: string) => !occupiedRooms.has(room));
                      
                      if (freeRooms.length === 0) {
                        return <div className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>Все заняты</div>;
                      }
                      
                      return (
                        <div className="flex flex-wrap gap-1">
                          {freeRooms.map((room: string) => (
                            <span
                              key={room}
                              className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                              style={{
                                backgroundColor: '#69db7c20',
                                color: '#2f9e44',
                                border: '1px solid #69db7c40',
                              }}
                            >
                              {room}
                            </span>
                          ))}
                        </div>
                      );
                    })()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ ОБЩЕЕ РАСПИСАНИЕ НА НЕДЕЛЮ (6 таблиц) ============
function GeneralWeekView({ lessons, classes, timeSlots, today, theme, filterBlocks, allRooms }: any) {
  const days = [1, 2, 3, 4, 5, 6];

  const isHighlighted = (lesson: Lesson) => {
    if (filterBlocks.length === 0) return false;
    return filterBlocks.some((block: any) => {
      switch (block.type) {
        case 'teacher': return lesson.teacher === block.value;
        case 'room': return lesson.room === block.value;
        case 'class': return lesson.className === block.value;
        default: return false;
      }
    });
  };

  return (
    <div className="space-y-6">
      {days.map(day => {
        const daySchedule = timeSlots.find((d: any) => d.dayOfWeek === day);
        const daySlots = daySchedule?.slots || [];
        const isToday = day === today;

        return (
          <div key={day} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
            {/* Заголовок дня */}
            <div className="p-3 flex items-center gap-2" style={{
              backgroundColor: isToday ? theme.primaryColor + '15' : 'var(--bg-tertiary)',
              borderBottom: '1px solid var(--border-color)',
            }}>
              <Calendar className="w-4 h-4" style={{ color: isToday ? theme.primaryColor : 'var(--text-muted)' }} />
              <h3 className="font-semibold text-sm" style={{ color: isToday ? theme.primaryColor : 'var(--text-primary)' }}>
                {dayNames[day - 1]}
                {isToday && <span className="ml-2 text-xs font-normal">(Сегодня)</span>}
              </h3>
            </div>

            {/* Таблица расписания */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse" style={{ minWidth: '900px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <th className="p-2 text-left text-xs font-semibold sticky left-0 z-10"
                      style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)', minWidth: '120px', borderRight: '1px solid var(--border-color)' }}>
                      <Clock className="w-4 h-4 inline mr-1" />
                      Время
                    </th>
                    {classes.map((cls: string) => (
                      <th key={cls} className="p-2 text-center text-xs font-semibold"
                        style={{ color: 'var(--text-primary)', minWidth: '100px', borderRight: '1px solid var(--border-color)' }}>
                        <span className="px-2 py-1 rounded-md inline-block" style={{ backgroundColor: theme.primaryColor + '15', color: theme.primaryColor }}>
                          {cls}
                        </span>
                      </th>
                    ))}
                    <th className="p-2 text-center text-xs font-semibold"
                      style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)', minWidth: '150px' }}>
                      Пустые кабинеты
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {daySlots.map((slot: any) => {
                    const isBreak = slot.isBreak;
                    return (
                      <tr key={slot.id} style={{
                        backgroundColor: isBreak ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                        borderBottom: '1px solid var(--border-color)',
                      }}>
                        <td className="p-2 sticky left-0 z-10" style={{
                          backgroundColor: isBreak ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                          borderRight: '2px solid var(--border-color)',
                          verticalAlign: 'top',
                        }}>
                          <div className="text-xs font-bold" style={{ color: isBreak ? '#868e96' : theme.primaryColor }}>
                            {slot.startTime}–{slot.endTime}
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                            {isBreak ? '🍽️ Обед' : slot.label}
                          </div>
                        </td>
                        {classes.map((cls: string) => {
                          const cellLessons = lessons.filter((l: Lesson) => 
                            l.className === cls && l.dayOfWeek === day && l.timeSlot === slot.id && !l.isBreak
                          );
                          
                          if (isBreak) {
                            return (
                              <td key={cls} className="p-1 text-center" style={{ borderRight: '1px solid var(--border-color)' }}>
                                <span className="text-xs" style={{ color: '#868e96' }}>🍽️</span>
                              </td>
                            );
                          }
                          
                          return (
                            <td key={cls} className="p-1" style={{ borderRight: '1px solid var(--border-color)', verticalAlign: 'top' }}>
                              {cellLessons.length > 0 ? (
                                <div className="space-y-0.5">
                                  {cellLessons.map((lesson: Lesson) => {
                                    const color = getSubjectColor(lesson.subject);
                                    const highlighted = isHighlighted(lesson);
                                    return (
                                      <div
                                        key={lesson.id}
                                        className="p-1.5 rounded-md text-xs transition-all hover:scale-[1.02] cursor-pointer"
                                        style={{
                                          backgroundColor: color + '18',
                                          borderLeft: `3px solid ${color}`,
                                          outline: highlighted ? `2px solid ${theme.accentColor}` : undefined,
                                        }}
                                        title={`${lesson.subject}${lesson.group ? ` (гр.${lesson.group})` : ''}\n${lesson.teacher}\nКабинет: ${lesson.room}\n${slot.startTime}–${slot.endTime}`}
                                      >
                                        <div className="font-semibold leading-tight" style={{ color }}>
                                          {lesson.group && <span className="opacity-70 text-[10px] mr-0.5">гр{lesson.group}</span>}
                                          {shortSubject(lesson.subject)}
                                        </div>
                                        <div className="text-[10px] leading-tight mt-0.5 opacity-80" style={{ color: 'var(--text-secondary)' }}>
                                          {lesson.teacher?.split(' ').slice(0, 2).join(' ')}
                                          {lesson.room && <span className="ml-1 opacity-60">• {lesson.room}</span>}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="p-1.5 text-center text-xs" style={{ color: 'var(--text-muted)' }}>—</div>
                              )}
                            </td>
                          );
                        })}
                        {/* Колонка "Пустые кабинеты" */}
                        <td className="p-2" style={{
                          backgroundColor: 'var(--bg-secondary)',
                          verticalAlign: 'top',
                        }}>
                          {isBreak ? (
                            <div className="text-xs text-center" style={{ color: '#868e96' }}>🍽️</div>
                          ) : (
                            (() => {
                              const occupiedRooms = new Set<string>();
                              lessons.forEach((l: Lesson) => {
                                if (l.dayOfWeek === day && l.timeSlot === slot.id && l.room) {
                                  occupiedRooms.add(l.room);
                                }
                              });
                              
                              const freeRooms = allRooms.filter((room: string) => !occupiedRooms.has(room));
                              
                              if (freeRooms.length === 0) {
                                return <div className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>Все заняты</div>;
                              }
                              
                              return (
                                <div className="flex flex-wrap gap-1">
                                  {freeRooms.map((room: string) => (
                                    <span
                                      key={room}
                                      className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                                      style={{
                                        backgroundColor: '#69db7c20',
                                        color: '#2f9e44',
                                        border: '1px solid #69db7c40',
                                      }}
                                    >
                                      {room}
                                    </span>
                                  ))}
                                </div>
                              );
                            })()
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============ РАСПИСАНИЕ КЛАССА НА ДЕНЬ ============
function ClassDayView({ dayOfWeek, daySchedule, lessons, theme, filterBlocks }: any) {
  const slots = daySchedule?.slots || [];
  
  const isHighlighted = (lesson: Lesson) => {
    if (filterBlocks.length === 0) return false;
    return filterBlocks.some((block: any) => {
      switch (block.type) {
        case 'subject': return lesson.subject === block.value;
        case 'teacher': return lesson.teacher === block.value;
        case 'room': return lesson.room === block.value;
        default: return false;
      }
    });
  };

  return (
    <div className="space-y-2">
      {slots.map((slot: any) => {
        const slotLessons = lessons.filter((l: Lesson) => l.dayOfWeek === dayOfWeek && l.timeSlot === slot.id && !l.isBreak);
        const isBreak = slot.isBreak;
        
        return (
          <div
            key={slot.id}
            className="flex gap-3 p-3 rounded-xl transition-all"
            style={{
              backgroundColor: isBreak ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
              border: `1px solid var(--border-color)`,
            }}
          >
            {/* Time */}
            <div className="w-28 flex-shrink-0 text-center py-1">
              <div className="text-sm font-bold" style={{ color: isBreak ? '#868e96' : theme.primaryColor }}>
                {slot.startTime}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {slot.endTime}
              </div>
              <div className="text-xs mt-1 font-medium" style={{ color: isBreak ? '#868e96' : 'var(--text-secondary)' }}>
                {isBreak ? '🍽️ Обед' : slot.label}
              </div>
            </div>

            {/* Lessons */}
            <div className="flex-1 flex gap-2 flex-wrap">
              {isBreak ? (
                <div className="flex-1 p-3 rounded-lg text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                  🍽️ Перемена / Обед
                </div>
              ) : slotLessons.length > 0 ? (
                slotLessons.map((lesson: Lesson) => {
                  if (lesson.isAssembly) {
                    return (
                      <div key={lesson.id} className="flex-1 min-w-[280px] p-3 rounded-lg"
                        style={{ backgroundColor: '#adb5bd15', borderLeft: '3px solid #adb5bd' }}>
                        <div className="font-medium text-sm" style={{ color: '#868e96' }}>🎤 {lesson.subject}</div>
                      </div>
                    );
                  }
                  const color = getSubjectColor(lesson.subject);
                  const highlighted = isHighlighted(lesson);
                  return (
                    <div
                      key={lesson.id}
                      className="flex-1 min-w-[280px] p-3 rounded-lg transition-all hover:scale-[1.01]"
                      style={{
                        backgroundColor: color + '15',
                        borderLeft: `4px solid ${color}`,
                        outline: highlighted ? `2px solid ${theme.accentColor}` : undefined,
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-semibold text-sm" style={{ color }}>
                          {lesson.group && <span className="opacity-70 text-xs mr-1 px-1 py-0.5 rounded" style={{ backgroundColor: color + '25' }}>гр.{lesson.group}</span>}
                          {lesson.subject}
                        </div>
                      </div>
                      <div className="text-xs mt-2 flex flex-wrap gap-x-3 gap-y-1" style={{ color: 'var(--text-secondary)' }}>
                        {lesson.teacher && (
                          <span className="flex items-center gap-1">
                            <span className="opacity-60">👤</span> {lesson.teacher}
                          </span>
                        )}
                        {lesson.room && (
                          <span className="flex items-center gap-1">
                            <span className="opacity-60">🚪</span> каб. {lesson.room}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex-1 p-3 rounded-lg text-sm text-center" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)' }}>
                  Нет уроков
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============ РАСПИСАНИЕ КЛАССА НА НЕДЕЛЮ ============
function ClassWeekView({ lessons, timeSlots, today, theme, filterBlocks }: any) {
  const days = [1, 2, 3, 4, 5, 6];
  
  // Получаем максимальное количество слотов среди всех дней
  const maxSlots = useMemo(() => {
    return Math.max(...timeSlots.map((d: any) => d.slots.length));
  }, [timeSlots]);

  const isHighlighted = (lesson: Lesson) => {
    if (filterBlocks.length === 0) return false;
    return filterBlocks.some((block: any) => {
      switch (block.type) {
        case 'teacher': return lesson.teacher === block.value;
        case 'room': return lesson.room === block.value;
        default: return false;
      }
    });
  };

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: '1000px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <th className="p-3 text-left text-xs font-semibold sticky left-0 z-10"
                style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)', minWidth: '120px', borderRight: '1px solid var(--border-color)' }}>
                <Clock className="w-4 h-4 inline mr-1" />
                Время
              </th>
              {days.map(day => (
                <th key={day} className="p-2 text-center text-sm font-semibold"
                  style={{
                    color: day === today ? theme.primaryColor : 'var(--text-primary)',
                    backgroundColor: day === today ? theme.primaryColor + '10' : 'transparent',
                    minWidth: '130px',
                    borderRight: '1px solid var(--border-color)',
                  }}>
                  {dayNames[day - 1]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxSlots }).map((_, idx) => {
              // Определяем номер урока или специальное событие для этой строки
              // Используем понедельник как эталон (там максимальное количество слотов)
              const mondaySlots = timeSlots.find((d: any) => d.dayOfWeek === 1);
              const referenceSlot = mondaySlots?.slots[idx];
              
              if (!referenceSlot) {
                return null;
              }
              
              // Определяем тип события
              const isReferenceBreak = referenceSlot.isBreak || false;
              const lessonNumber = referenceSlot.label.includes('урок') 
                ? parseInt(referenceSlot.label.split(' ')[0])
                : null;
              
              return (
                <tr key={idx} style={{
                  borderBottom: '1px solid var(--border-color)',
                }}>
                  <td className="p-2 sticky left-0 z-10" style={{
                    borderRight: '2px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    verticalAlign: 'top',
                  }}>
                    {isReferenceBreak ? (
                      <>
                        <div className="text-xs font-bold" style={{ color: '#868e96' }}>🍽️ Обед</div>
                        <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          {referenceSlot.startTime}–{referenceSlot.endTime}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-xs font-bold" style={{ color: theme.primaryColor }}>
                          {referenceSlot.label}
                        </div>
                        <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          {referenceSlot.startTime}–{referenceSlot.endTime}
                        </div>
                      </>
                    )}
                  </td>
                  {days.map(day => {
                    const daySlots = timeSlots.find((d: any) => d.dayOfWeek === day);
                    
                    // Ищем слот в текущем дне по типу события
                    let slot;
                    if (isReferenceBreak) {
                      // Ищем обед
                      slot = daySlots?.slots.find((s: any) => s.isBreak);
                    } else if (referenceSlot.label === 'Линейка') {
                      // Ищем линейку (только в понедельник)
                      slot = day === 1 ? daySlots?.slots.find((s: any) => s.label === 'Линейка') : null;
                    } else if (referenceSlot.label === 'Разговоры о важном') {
                      // Ищем разговоры (только в понедельник)
                      slot = day === 1 ? daySlots?.slots.find((s: any) => s.label === 'Разговоры о важном') : null;
                    } else if (lessonNumber) {
                      // Ищем урок по номеру
                      slot = daySlots?.slots.find((s: any) => s.label === `${lessonNumber} урок`);
                    }
                    
                    if (!slot) {
                      return (
                        <td key={day} className="p-2 text-center text-xs" style={{ color: 'var(--text-muted)' }}>—</td>
                      );
                    }
                    
                    const isDayBreak = slot.isBreak || false;
                    const cellLessons = lessons.filter((l: Lesson) => 
                      l.dayOfWeek === day && l.timeSlot === slot.id && !l.isBreak
                    );
                    
                    return (
                      <td key={day} className="p-1" style={{
                        borderRight: '1px solid var(--border-color)',
                        backgroundColor: day === today && !isDayBreak ? theme.primaryColor + '05' : undefined,
                        verticalAlign: 'top',
                      }}>
                        {isDayBreak ? (
                          <div className="p-2 text-center text-xs" style={{ color: '#868e96' }}>🍽️</div>
                        ) : cellLessons.length > 0 ? (
                          <div className="space-y-0.5">
                            {cellLessons.map((lesson: Lesson) => {
                              const color = getSubjectColor(lesson.subject);
                              const highlighted = isHighlighted(lesson);
                              return (
                                <div
                                  key={lesson.id}
                                  className="p-1.5 rounded-md text-xs transition-all hover:scale-[1.02] cursor-pointer"
                                  style={{
                                    backgroundColor: color + '18',
                                    borderLeft: `3px solid ${color}`,
                                    outline: highlighted ? `2px solid ${theme.accentColor}` : undefined,
                                  }}
                                  title={`${lesson.subject}${lesson.group ? ` (гр.${lesson.group})` : ''}\n${lesson.teacher}\nКабинет: ${lesson.room}\n${slot?.startTime || ''}–${slot?.endTime || ''}`}
                                >
                                  <div className="font-semibold leading-tight" style={{ color }}>
                                    {lesson.isAssembly && '🎤 '}
                                    {lesson.group && <span className="opacity-70 text-[10px] mr-0.5">гр{lesson.group}</span>}
                                    {shortSubject(lesson.subject)}
                                  </div>
                                  <div className="text-[10px] leading-tight mt-0.5 opacity-80" style={{ color: 'var(--text-secondary)' }}>
                                    {lesson.teacher && <span>{lesson.teacher.split(' ')[0]} </span>}
                                    {lesson.room && <span>🚪 {lesson.room}</span>}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-2 text-center text-xs" style={{ color: 'var(--text-muted)' }}>—</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
