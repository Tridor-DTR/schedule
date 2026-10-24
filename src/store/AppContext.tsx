import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { generateLessons } from '../data/scheduleData';

export type Role = 'student' | 'teacher' | 'composer' | 'parent' | 'superadmin';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  activeRole: Role;
  schoolId: string;
  className?: string;
  teacherSubject?: string;
}

export interface Lesson {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  className: string;
  group?: string;
  dayOfWeek: number;
  timeSlot: number;
  duration?: number;
  tags?: string[];
  isBreak?: boolean;
  isAssembly?: boolean;
}

export interface TimeSlot {
  id: number;
  label: string;
  startTime: string;
  endTime: string;
  isBreak?: boolean;
}

export interface DaySchedule {
  dayOfWeek: number;
  dayName: string;
  slots: TimeSlot[];
}

export interface SchoolApplication {
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  contactName: string;
}

export interface ThemeConfig {
  mode: 'light' | 'dark';
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  theme: ThemeConfig;
  currentSchoolId: string;
  schedule: Lesson[];
  timeSlots: DaySchedule[];
  applications: SchoolApplication[];
  selectedDay: number;
  viewMode: 'day' | 'week';
  scheduleView: 'general' | 'personal';
  filters: FilterCondition[];
  warnings: Warning[];
}

export interface FilterCondition {
  id: string;
  type: 'subject' | 'teacher' | 'room' | 'class' | 'day' | 'time';
  value: string;
  operator: 'AND' | 'OR' | 'NOT';
}

export interface Warning {
  id: string;
  type: 'teacher' | 'room' | 'sanpin' | 'conflict';
  message: string;
  lessonId?: string;
}

type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SWITCH_ROLE'; payload: Role }
  | { type: 'SET_THEME'; payload: Partial<ThemeConfig> }
  | { type: 'SET_SCHOOL'; payload: string }
  | { type: 'SET_SCHEDULE'; payload: Lesson[] }
  | { type: 'ADD_LESSON'; payload: Lesson }
  | { type: 'UPDATE_LESSON'; payload: Lesson }
  | { type: 'DELETE_LESSON'; payload: string }
  | { type: 'SET_TIME_SLOTS'; payload: DaySchedule[] }
  | { type: 'SET_SELECTED_DAY'; payload: number }
  | { type: 'SET_VIEW_MODE'; payload: 'day' | 'week' }
  | { type: 'SET_SCHEDULE_VIEW'; payload: 'general' | 'personal' }
  | { type: 'SET_FILTERS'; payload: FilterCondition[] }
  | { type: 'ADD_APPLICATION'; payload: SchoolApplication }
  | { type: 'UPDATE_APPLICATION'; payload: { id: string; status: 'approved' | 'rejected' } }
  | { type: 'ADD_WARNING'; payload: Warning }
  | { type: 'CLEAR_WARNINGS' };

const defaultTimeSlots: DaySchedule[] = [
  {
    dayOfWeek: 1,
    dayName: 'Понедельник',
    slots: [
      { id: 1, label: 'Линейка', startTime: '8:00', endTime: '8:05' },
      { id: 2, label: 'Разговоры о важном', startTime: '8:05', endTime: '8:35' },
      { id: 3, label: '2 урок', startTime: '8:45', endTime: '9:30' },
      { id: 4, label: '3 урок', startTime: '9:40', endTime: '10:25' },
      { id: 5, label: '4 урок', startTime: '10:35', endTime: '11:20' },
      { id: 6, label: 'Обед', startTime: '11:20', endTime: '12:20', isBreak: true },
      { id: 7, label: '5 урок', startTime: '12:20', endTime: '13:00' },
      { id: 8, label: '6 урок', startTime: '13:10', endTime: '13:50' },
      { id: 9, label: '7 урок', startTime: '14:00', endTime: '14:40' },
      { id: 10, label: '8 урок', startTime: '14:50', endTime: '15:30' },
    ],
  },
  {
    dayOfWeek: 2,
    dayName: 'Вторник',
    slots: [
      { id: 1, label: '1 урок', startTime: '8:00', endTime: '8:45' },
      { id: 2, label: '2 урок', startTime: '8:55', endTime: '9:40' },
      { id: 3, label: '3 урок', startTime: '9:50', endTime: '10:35' },
      { id: 4, label: '4 урок', startTime: '10:45', endTime: '11:30' },
      { id: 5, label: 'Обед', startTime: '11:30', endTime: '12:30', isBreak: true },
      { id: 6, label: '5 урок', startTime: '12:30', endTime: '13:10' },
      { id: 7, label: '6 урок', startTime: '13:20', endTime: '14:00' },
      { id: 8, label: '7 урок', startTime: '14:10', endTime: '14:50' },
      { id: 9, label: '8 урок', startTime: '15:00', endTime: '15:40' },
    ],
  },
  {
    dayOfWeek: 3,
    dayName: 'Среда',
    slots: [
      { id: 1, label: '1 урок', startTime: '8:00', endTime: '8:45' },
      { id: 2, label: '2 урок', startTime: '8:55', endTime: '9:40' },
      { id: 3, label: '3 урок', startTime: '9:50', endTime: '10:35' },
      { id: 4, label: '4 урок', startTime: '10:45', endTime: '11:30' },
      { id: 5, label: 'Обед', startTime: '11:30', endTime: '12:30', isBreak: true },
      { id: 6, label: '5 урок', startTime: '12:30', endTime: '13:10' },
      { id: 7, label: '6 урок', startTime: '13:20', endTime: '14:00' },
      { id: 8, label: '7 урок', startTime: '14:10', endTime: '14:50' },
      { id: 9, label: '8 урок', startTime: '15:00', endTime: '15:40' },
    ],
  },
  {
    dayOfWeek: 4,
    dayName: 'Четверг',
    slots: [
      { id: 1, label: '1 урок', startTime: '8:00', endTime: '8:45' },
      { id: 2, label: '2 урок', startTime: '8:55', endTime: '9:40' },
      { id: 3, label: '3 урок', startTime: '9:50', endTime: '10:35' },
      { id: 4, label: '4 урок', startTime: '10:45', endTime: '11:30' },
      { id: 5, label: 'Обед', startTime: '11:30', endTime: '12:30', isBreak: true },
      { id: 6, label: '5 урок', startTime: '12:30', endTime: '13:10' },
      { id: 7, label: '6 урок', startTime: '13:20', endTime: '14:00' },
      { id: 8, label: '7 урок', startTime: '14:10', endTime: '14:50' },
      { id: 9, label: '8 урок', startTime: '15:00', endTime: '15:40' },
    ],
  },
  {
    dayOfWeek: 5,
    dayName: 'Пятница',
    slots: [
      { id: 1, label: '1 урок', startTime: '8:00', endTime: '8:45' },
      { id: 2, label: '2 урок', startTime: '8:55', endTime: '9:40' },
      { id: 3, label: '3 урок', startTime: '9:50', endTime: '10:35' },
      { id: 4, label: '4 урок', startTime: '10:45', endTime: '11:30' },
      { id: 5, label: 'Обед', startTime: '11:30', endTime: '12:30', isBreak: true },
      { id: 6, label: '5 урок', startTime: '12:30', endTime: '13:10' },
      { id: 7, label: '6 урок', startTime: '13:20', endTime: '14:00' },
      { id: 8, label: '7 урок', startTime: '14:10', endTime: '14:50' },
    ],
  },
  {
    dayOfWeek: 6,
    dayName: 'Суббота',
    slots: [
      { id: 1, label: '1 урок', startTime: '8:00', endTime: '8:40' },
      { id: 2, label: '2 урок', startTime: '8:45', endTime: '9:25' },
      { id: 3, label: '3 урок', startTime: '9:30', endTime: '10:10' },
      { id: 4, label: '4 урок', startTime: '10:15', endTime: '10:55' },
      { id: 5, label: '5 урок', startTime: '11:00', endTime: '11:40' },
    ],
  },
];

// Генерируем уроки из реального расписания школы
const realLessons: Lesson[] = generateLessons();

// Добавляем линейку в понедельник для всех классов
const assemblyLessons: Lesson[] = ['5А', '6А', '7А', '7Б', '8А', '8Б', '8В', '9А', '9Б', '10А', '10Б', '11А'].map((cls, i) => ({
  id: `assembly-${i}`,
  subject: 'Линейка',
  teacher: '',
  room: '',
  className: cls,
  dayOfWeek: 1,
  timeSlot: 1,
  isAssembly: true,
  tags: ['assembly'],
}));

// Добавляем обед как "урок" для отображения
const breakLessons: Lesson[] = ['5А', '6А', '7А', '7Б', '8А', '8Б', '8В', '9А', '9Б', '10А', '10Б', '11А'].flatMap((cls) => 
  [1, 2, 3, 4, 5, 6].map(day => ({
    id: `break-${cls}-${day}`,
    subject: 'ОБЕД',
    teacher: '',
    room: '',
    className: cls,
    dayOfWeek: day,
    timeSlot: day === 1 ? 6 : 5, // ПН: slot 6, остальные: slot 5
    isBreak: true,
    tags: ['break'],
  }))
);

const demoLessons: Lesson[] = [...assemblyLessons, ...breakLessons, ...realLessons];

// (старые демо-уроки удалены)
const _placeholder_start = [
  { id: 'old-1', subject: 'Математика', teacher: 'Петрова А.И.', room: '201', className: '9А', dayOfWeek: 1, timeSlot: 3, tags: ['math'] },
  { id: 'old-2', subject: 'Русский язык', teacher: 'Сидорова Е.В.', room: '305', className: '9А', dayOfWeek: 1, timeSlot: 4, tags: ['language'] },
  { id: '3', subject: 'Физика', teacher: 'Козлов Д.М.', room: '112', className: '9А', dayOfWeek: 1, timeSlot: 5, tags: ['science'] },
  { id: '4', subject: 'История', teacher: 'Новикова О.П.', room: '208', className: '9А', dayOfWeek: 1, timeSlot: 7, tags: ['social'] },
  { id: '5', subject: 'Английский язык', teacher: 'Белова К.С.', room: '310', className: '9А', dayOfWeek: 1, timeSlot: 8, tags: ['language'] },
  { id: '6', subject: 'Литература', teacher: 'Сидорова Е.В.', room: '305', className: '9А', dayOfWeek: 2, timeSlot: 1, tags: ['language'] },
  { id: '7', subject: 'Математика', teacher: 'Петрова А.И.', room: '201', className: '9А', dayOfWeek: 2, timeSlot: 2, tags: ['math'] },
  { id: '8', subject: 'Химия', teacher: 'Волкова Н.А.', room: '115', className: '9А', dayOfWeek: 2, timeSlot: 3, tags: ['science'] },
  { id: '9', subject: 'Физкультура', teacher: 'Орлов С.В.', room: 'Спортзал', className: '9А', dayOfWeek: 2, timeSlot: 4, tags: ['sport'] },
  { id: '10', subject: 'Информатика', teacher: 'Морозов И.К.', room: '401', className: '9А', dayOfWeek: 2, timeSlot: 6, tags: ['tech'] },
  { id: '11', subject: 'Геометрия', teacher: 'Петрова А.И.', room: '201', className: '9А', dayOfWeek: 2, timeSlot: 7, tags: ['math'] },
  { id: '12', subject: 'Биология', teacher: 'Лебедева Т.Г.', room: '118', className: '9А', dayOfWeek: 3, timeSlot: 1, tags: ['science'] },
  { id: '13', subject: 'Математика', teacher: 'Петрова А.И.', room: '201', className: '9А', dayOfWeek: 3, timeSlot: 2, tags: ['math'] },
  { id: '14', subject: 'Русский язык', teacher: 'Сидорова Е.В.', room: '305', className: '9А', dayOfWeek: 3, timeSlot: 3, tags: ['language'] },
  { id: '15', subject: 'География', teacher: 'Кузнецов В.А.', room: '210', className: '9А', dayOfWeek: 3, timeSlot: 4, tags: ['social'] },
  { id: '16', subject: 'Обществознание', teacher: 'Новикова О.П.', room: '208', className: '9А', dayOfWeek: 3, timeSlot: 6, tags: ['social'] },
  { id: '17', subject: 'Английский язык', teacher: 'Белова К.С.', room: '310', className: '9А', dayOfWeek: 3, timeSlot: 7, tags: ['language'] },
  { id: '18', subject: 'Математика', teacher: 'Петрова А.И.', room: '201', className: '9А', dayOfWeek: 4, timeSlot: 1, tags: ['math'] },
  { id: '19', subject: 'Физика', teacher: 'Козлов Д.М.', room: '112', className: '9А', dayOfWeek: 4, timeSlot: 2, tags: ['science'] },
  { id: '20', subject: 'Русский язык', teacher: 'Сидорова Е.В.', room: '305', className: '9А', dayOfWeek: 4, timeSlot: 3, tags: ['language'] },
  { id: '21', subject: 'Литература', teacher: 'Сидорова Е.В.', room: '305', className: '9А', dayOfWeek: 4, timeSlot: 4, tags: ['language'] },
  { id: '22', subject: 'Химия', teacher: 'Волкова Н.А.', room: '115', className: '9А', dayOfWeek: 4, timeSlot: 6, tags: ['science'] },
  { id: '23', subject: 'Технология', teacher: 'Смирнов П.Р.', room: 'Мастерская', className: '9А', dayOfWeek: 4, timeSlot: 7, tags: ['tech'] },
  { id: '24', subject: 'Математика', teacher: 'Петрова А.И.', room: '201', className: '9А', dayOfWeek: 5, timeSlot: 1, tags: ['math'] },
  { id: '25', subject: 'Русский язык', teacher: 'Сидорова Е.В.', room: '305', className: '9А', dayOfWeek: 5, timeSlot: 2, tags: ['language'] },
  { id: '26', subject: 'История', teacher: 'Новикова О.П.', room: '208', className: '9А', dayOfWeek: 5, timeSlot: 3, tags: ['social'] },
  { id: '27', subject: 'Физкультура', teacher: 'Орлов С.В.', room: 'Спортзал', className: '9А', dayOfWeek: 5, timeSlot: 4, tags: ['sport'] },
  { id: '28', subject: 'Информатика', teacher: 'Морозов И.К.', room: '401', className: '9А', dayOfWeek: 5, timeSlot: 6, tags: ['tech'] },
  { id: '29', subject: 'ОБЖ', teacher: 'Орлов С.В.', room: '208', className: '9А', dayOfWeek: 5, timeSlot: 7, tags: ['social'] },
  // 9Б класс
  { id: '30', subject: 'Математика', teacher: 'Петрова А.И.', room: '201', className: '9Б', dayOfWeek: 1, timeSlot: 3, tags: ['math'] },
  { id: '31', subject: 'Русский язык', teacher: 'Сидорова Е.В.', room: '305', className: '9Б', dayOfWeek: 1, timeSlot: 4, tags: ['language'] },
  { id: '32', subject: 'Биология', teacher: 'Лебедева Т.Г.', room: '118', className: '9Б', dayOfWeek: 1, timeSlot: 5, tags: ['science'] },
  { id: '33', subject: 'Английский язык', teacher: 'Белова К.С.', room: '310', className: '9Б', dayOfWeek: 1, timeSlot: 7, tags: ['language'] },
  { id: '34', subject: 'Физика', teacher: 'Козлов Д.М.', room: '112', className: '9Б', dayOfWeek: 1, timeSlot: 8, tags: ['science'] },
  { id: '35', subject: 'Литература', teacher: 'Сидорова Е.В.', room: '305', className: '9Б', dayOfWeek: 2, timeSlot: 1, tags: ['language'] },
  { id: '36', subject: 'Геометрия', teacher: 'Петрова А.И.', room: '201', className: '9Б', dayOfWeek: 2, timeSlot: 2, tags: ['math'] },
  { id: '37', subject: 'Химия', teacher: 'Волкова Н.А.', room: '115', className: '9Б', dayOfWeek: 2, timeSlot: 3, tags: ['science'] },
  { id: '38', subject: 'География', teacher: 'Кузнецов В.А.', room: '210', className: '9Б', dayOfWeek: 2, timeSlot: 4, tags: ['social'] },
  { id: '39', subject: 'Информатика', teacher: 'Морозов И.К.', room: '401', className: '9Б', dayOfWeek: 2, timeSlot: 6, tags: ['tech'] },
  { id: '40', subject: 'Физкультура', teacher: 'Орлов С.В.', room: 'Спортзал', className: '9Б', dayOfWeek: 2, timeSlot: 7, tags: ['sport'] },
  // 7А класс
  { id: '41', subject: 'Математика', teacher: 'Петрова А.И.', room: '201', className: '7А', dayOfWeek: 1, timeSlot: 3, tags: ['math'] },
  { id: '42', subject: 'Русский язык', teacher: 'Сидорова Е.В.', room: '305', className: '7А', dayOfWeek: 1, timeSlot: 4, tags: ['language'] },
  { id: '43', subject: 'Английский язык', teacher: 'Белова К.С.', room: '310', className: '7А', dayOfWeek: 1, timeSlot: 5, tags: ['language'] },
  { id: '44', subject: 'История', teacher: 'Новикова О.П.', room: '208', className: '7А', dayOfWeek: 1, timeSlot: 7, tags: ['social'] },
  { id: '45', subject: 'Физкультура', teacher: 'Орлов С.В.', room: 'Спортзал', className: '7А', dayOfWeek: 1, timeSlot: 8, tags: ['sport'] },
  { id: '46', subject: 'Литература', teacher: 'Сидорова Е.В.', room: '305', className: '7А', dayOfWeek: 2, timeSlot: 1, tags: ['language'] },
  { id: '47', subject: 'Математика', teacher: 'Петрова А.И.', room: '201', className: '7А', dayOfWeek: 2, timeSlot: 2, tags: ['math'] },
  { id: '48', subject: 'Биология', teacher: 'Лебедева Т.Г.', room: '118', className: '7А', dayOfWeek: 2, timeSlot: 3, tags: ['science'] },
  { id: '49', subject: 'География', teacher: 'Кузнецов В.А.', room: '210', className: '7А', dayOfWeek: 2, timeSlot: 4, tags: ['social'] },
  { id: '50', subject: 'Технология', teacher: 'Смирнов П.Р.', room: 'Мастерская', className: '7А', dayOfWeek: 2, timeSlot: 6, tags: ['tech'] },
];
void _placeholder_start;

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  theme: {
    mode: 'light',
    primaryColor: '#5c7cfa',
    accentColor: '#f06595',
    fontFamily: 'Inter',
    borderRadius: '8px',
  },
  currentSchoolId: 'school-1',
  schedule: demoLessons,
  timeSlots: defaultTimeSlots,
  applications: [
    {
      id: 'app-1',
      name: 'МБОУ СОШ №42',
      type: 'school',
      email: 'school42@example.com',
      phone: '+7 (999) 123-45-67',
      status: 'pending',
      submittedAt: '2025-01-15',
      contactName: 'Иванов Сергей Петрович',
    },
    {
      id: 'app-2',
      name: 'Гимназия №7',
      type: 'school',
      email: 'gym7@example.com',
      phone: '+7 (999) 765-43-21',
      status: 'pending',
      submittedAt: '2025-01-18',
      contactName: 'Смирнова Анна Викторовна',
    },
  ],
  selectedDay: new Date().getDay() || 7,
  viewMode: 'day',
  scheduleView: 'general',
  filters: [],
  warnings: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'SWITCH_ROLE':
      return state.user ? { ...state, user: { ...state.user, activeRole: action.payload } } : state;
    case 'SET_THEME':
      return { ...state, theme: { ...state.theme, ...action.payload } };
    case 'SET_SCHOOL':
      return { ...state, currentSchoolId: action.payload };
    case 'SET_SCHEDULE':
      return { ...state, schedule: action.payload };
    case 'ADD_LESSON':
      return { ...state, schedule: [...state.schedule, action.payload] };
    case 'UPDATE_LESSON':
      return { ...state, schedule: state.schedule.map(l => l.id === action.payload.id ? action.payload : l) };
    case 'DELETE_LESSON':
      return { ...state, schedule: state.schedule.filter(l => l.id !== action.payload) };
    case 'SET_TIME_SLOTS':
      return { ...state, timeSlots: action.payload };
    case 'SET_SELECTED_DAY':
      return { ...state, selectedDay: action.payload };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'SET_SCHEDULE_VIEW':
      return { ...state, scheduleView: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'ADD_APPLICATION':
      return { ...state, applications: [...state.applications, action.payload] };
    case 'UPDATE_APPLICATION':
      return {
        ...state,
        applications: state.applications.map(a =>
          a.id === action.payload.id ? { ...a, status: action.payload.status } : a
        ),
      };
    case 'ADD_WARNING':
      return { ...state, warnings: [...state.warnings, action.payload] };
    case 'CLEAR_WARNINGS':
      return { ...state, warnings: [] };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (init) => {
    const saved = localStorage.getItem('fractal-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...init, theme: parsed.theme || init.theme, user: parsed.user || null, isAuthenticated: !!parsed.user };
      } catch {
        return init;
      }
    }
    return init;
  });

  useEffect(() => {
    localStorage.setItem('fractal-state', JSON.stringify({
      theme: state.theme,
      user: state.user,
    }));
  }, [state.theme, state.user]);

  useEffect(() => {
    if (state.theme.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme.mode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
