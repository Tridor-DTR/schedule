import { Lesson } from '../store/AppContext';

// Групповой урок: делится на 1 и 2 группу
interface GroupLesson {
  subject: string;
  groups: { group: string; teacher: string; room?: string }[];
}

// Простой урок
interface SimpleLesson {
  subject: string;
  teacher: string;
  room?: string;
}

type LessonEntry = SimpleLesson | GroupLesson;

function isGroupLesson(l: LessonEntry): l is GroupLesson {
  return 'groups' in l;
}

// Расписание для 5А
const schedule5A: Record<number, (LessonEntry | null)[]> = {
  1: [ // ПН
    { subject: 'Разговоры о важном', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Математика', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Хакимов А.Т.', room: '118' },
    ]},
    null, // ОБЕД
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    { subject: 'Литература', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Технология / Тур.яз', groups: [
      { group: '1', teacher: 'Хасаншин А.Р.', room: '122' },
      { group: '2', teacher: 'Эрдаг Э.Э.', room: '102' },
    ]},
  ],
  2: [ // ВТ
    { subject: 'Тур.яз / Информатика', groups: [
      { group: '1', teacher: 'Галиев Р.Р.', room: '212' },
      { group: '2', teacher: 'Шамсеев А.Р.', room: '209' },
    ]},
    { subject: 'Физкультура', teacher: 'Калислямов А.А.' },
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Математика', teacher: 'Шавалеева Л.Р.', room: '101' },
    null,
    { subject: 'Род.лит(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Классный час', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Россия — мои горизонты', teacher: '' },
    { subject: 'ИТР', teacher: '' },
  ],
  3: [ // СР
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '116' },
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Математика', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    null,
    { subject: 'История', teacher: 'Хусаинов В.Ф.', room: '217' },
    { subject: 'ИЗО', teacher: 'Хасаншин А.Р.', room: '122' },
    { subject: 'Олимп. матем.', teacher: 'Мингараев И.И.' },
  ],
  4: [ // ЧТ
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Хакимов А.Т.', room: '118' },
    ]},
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Математика', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'Математика (эл)', teacher: 'Шавалеева Л.Р.', room: '101' },
    null,
    { subject: 'Английский язык (1)', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Хакимов А.Т.', room: '118' },
    ]},
    { subject: 'Литература', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'История', teacher: 'Хусаинов В.Ф.', room: '217' },
  ],
  5: [ // ПТ
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'История', teacher: 'Хусаинов В.Ф.', room: '217' },
    { subject: 'Тур.яз / Технология', groups: [
      { group: '1', teacher: 'Эрдаг Э.Э.', room: '102' },
      { group: '2', teacher: 'Хасаншин А.Р.', room: '122' },
    ]},
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    null,
    { subject: 'Китап time', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Физкультура (1)', teacher: 'Сулейманов Р.Н.' },
    { subject: 'Информатика / Тур.яз', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Галиев Р.Р.', room: '123' },
    ]},
  ],
  6: [ // СБ
    null, // урок 1 отсутствует
    { subject: 'Литература', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Математика', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'Математика (1)', teacher: 'Шавалеева Л.Р.', room: '101' },
    null,
    { subject: 'Джиу-джитсу', teacher: 'Калислямов А.А.' },
  ],
};

const schedule6A: Record<number, (LessonEntry | null)[]> = {
  1: [
    { subject: 'Разговоры о важном', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'Математика', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'Русский язык', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    null,
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Хакимов А.Т.', room: '118' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    { subject: 'Литература', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'Математика (1)', teacher: 'Шавалеева Л.Р.', room: '101' },
  ],
  2: [
    { subject: 'Математика', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'Русский язык', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'ИЗО', teacher: 'Хасаншин А.Р.', room: '122' },
    { subject: 'Английский (1) / Тур.яз', groups: [
      { group: '1', teacher: 'Хакимов А.Т.', room: '118' },
      { group: '2', teacher: 'Эрдаг Э.Э.', room: '102' },
    ]},
    null,
    { subject: 'Информатика (1) / Тур.яз (1)', groups: [
      { group: '1', teacher: 'Валиев Д.Р.', room: '212' },
      { group: '2', teacher: 'Эрдаг Э.Э.', room: '102' },
    ]},
    { subject: 'Классный час', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'Россия — мои горизонты', teacher: '' },
    { subject: 'ИТР', teacher: '' },
  ],
  3: [
    { subject: 'Математика', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Хакимов А.Т.', room: '118' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
    { subject: 'Русский язык', teacher: 'Шарафутдинова О.В.', room: '208' },
    null,
    { subject: 'Литература', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'Тур.яз (1) / Информатика (1)', groups: [
      { group: '1', teacher: 'Эрдаг Э.Э.', room: '102' },
      { group: '2', teacher: 'Валиев Д.Р.', room: '212' },
    ]},
    { subject: 'Математика (1)', teacher: 'Шавалеева Л.Р.', room: '101' },
  ],
  4: [
    { subject: 'Математика', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'Род.лит(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Джиу-джитсу', teacher: 'Калислямов А.А.' },
    null,
    { subject: 'Турецкий язык', teacher: 'Эрдаг Э.Э.', room: '102' },
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.', room: '208' },
  ],
  5: [
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Хакимов А.Т.', room: '118' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    { subject: 'Русский язык', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '116' },
    { subject: 'Русский язык', teacher: 'Шарафутдинова О.В.', room: '208' },
    null,
    { subject: 'Технология / Английский (1)', groups: [
      { group: '1', teacher: 'Хасаншин А.Р.', room: '122' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    { subject: 'Китап time', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'Музыка', teacher: 'Хуснуллина З.Д.', room: '101' },
  ],
  6: [
    { subject: 'Математика', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'История', teacher: 'Хусаинов В.Ф.', room: '217' },
    { subject: 'Физкультура (1)', teacher: 'Калислямов А.А.' },
    { subject: 'Русский язык', teacher: 'Шарафутдинова О.В.', room: '208' },
    null,
    { subject: 'Литература', teacher: 'Шарафутдинова О.В.', room: '208' },
  ],
};

const schedule7A: Record<number, (LessonEntry | null)[]> = {
  1: [
    { subject: 'Разговоры о важном', teacher: 'Фатхиева Г.З.', room: '213' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Хакимов А.Т.', room: '118' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Информатика / Тур.яз (1)', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Эрдаг Э.Э.', room: '102' },
    ]},
    null,
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    { subject: 'Физика', teacher: 'Файзуллин И.Х.', room: '213' },
  ],
  2: [
    { subject: 'Джиу-джитсу', teacher: 'Калислямов А.А.' },
    { subject: 'Род.лит(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Фатхиева Г.З.' },
    ]},
    { subject: 'Геометрия', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    null,
    { subject: 'Физкультура (1)', teacher: 'Калислямов А.А.' },
    { subject: 'Классный час', teacher: 'Фатхиева Г.З.', room: '213' },
    { subject: 'Россия — мои горизонты', teacher: '' },
    { subject: 'ИТР', teacher: '' },
  ],
  3: [
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Фатхиева Г.З.' },
    ]},
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '116' },
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'ИЗО', teacher: 'Хасаншин А.Р.', room: '122' },
    null,
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'История', teacher: 'Хусаинов В.Ф.', room: '217' },
  ],
  4: [
    { subject: 'Физика', teacher: 'Файзуллин И.Х.', room: '208' },
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Геометрия', teacher: 'Маннанов Р.Р.', room: '119' },
    null,
    { subject: 'Информатика (1) / Информатика', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Валиев Д.Р.', room: '212' },
    ]},
    { subject: 'Технология / Английский', groups: [
      { group: '1', teacher: 'Хасаншин А.Р.', room: '122' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Хакимов А.Т.', room: '118' },
      { group: '2', teacher: 'Эрдаг Э.Э.', room: '102' },
    ]},
  ],
  5: [
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Фатхиева Г.З.', room: '210' },
    ]},
    { subject: 'История', teacher: 'Хусаинов В.Ф.', room: '217' },
    { subject: 'Литература', teacher: 'Фасхутдинова Р.И.', room: '215' },
    null,
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '116' },
    { subject: 'Китап time', teacher: 'Фатхиева Г.З.', room: '213' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Хакимов А.Т.', room: '118' },
      { group: '2', teacher: 'Валиев Д.Р.', room: '212' },
    ]},
  ],
  6: [
    { subject: 'Физика', teacher: 'Файзуллин И.Х.', room: '206' },
    { subject: 'Вероятность и статистика', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'История', teacher: 'Хусаинов В.Ф.', room: '217' },
    { subject: 'Литература', teacher: 'Фасхутдинова Р.И.', room: '215' },
    null,
    { subject: 'Тур.яз (1) / Английский', groups: [
      { group: '1', teacher: 'Эрдаг Э.Э.', room: '102' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
    { subject: 'Английский / Информатика', groups: [
      { group: '1', teacher: 'Хакимов А.Т.', room: '118' },
      { group: '2', teacher: 'Валиев Д.Р.', room: '212' },
    ]},
  ],
};

const schedule7B: Record<number, (LessonEntry | null)[]> = {
  1: [
    { subject: 'Разговоры о важном', teacher: 'Хакимов А.Т.', room: '118' },
    { subject: 'Алгебра', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    null,
    { subject: 'Физика', teacher: 'Галеев Ф.А.', room: '123' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Хакимов А.Т.', room: '118' },
    ]},
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '116' },
  ],
  2: [
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Хабибуллина А.Ф.', room: '210' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Род.лит(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Хабибуллина А.Ф.', room: '210' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Физкультура (1)', teacher: 'Калислямов А.А.' },
    null,
    { subject: 'Геометрия', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Классный час', teacher: 'Хакимов А.Т.', room: '118' },
    { subject: 'Россия — мои горизонты', teacher: '' },
    { subject: 'ИТР', teacher: '' },
  ],
  3: [
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Алгебра', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '116' },
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Хабибуллина А.Ф.', room: '210' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    null,
    { subject: 'Физика', teacher: 'Галеев Ф.А.', room: '103' },
    { subject: 'Физика', teacher: 'Галеев Ф.А.', room: '103' },
    { subject: 'История', teacher: 'Хусаинов В.Ф.', room: '217' },
  ],
  4: [
    { subject: 'Геометрия', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Информатика (1) / Информатика (1)', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Валиев Д.Р.', room: '212' },
    ]},
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Хакимов А.Т.', room: '118' },
    ]},
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    null,
    { subject: 'Литература', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Тур.яз (1) / Тур.яз (1)', groups: [
      { group: '1', teacher: 'Эрдаг Э.Э.', room: '101' },
      { group: '2', teacher: 'Галиев Р.Р.', room: '118' },
    ]},
    { subject: 'Джиу-джитсу', teacher: 'Калислямов А.А.' },
  ],
  5: [
    { subject: 'ИЗО', teacher: 'Хасаншин А.Р.', room: '122' },
    { subject: 'Технология / Тур.яз', groups: [
      { group: '1', teacher: 'Хасаншин А.Р.', room: '122' },
      { group: '2', teacher: 'Эрдаг Э.Э.', room: '102' },
    ]},
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
    { subject: 'История', teacher: 'Хусаинов В.Ф.', room: '217' },
    null,
    { subject: 'Музыка', teacher: 'Хуснуллина З.Д.', room: '101' },
    { subject: 'Китап time', teacher: 'Хакимов А.Т.', room: '118' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Хакимов А.Т.', room: '118' },
    ]},
  ],
  6: [
    { subject: 'Алгебра', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Хакимов А.Т.', room: '118' },
    ]},
    { subject: 'Литература', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'История', teacher: 'Хусаинов В.Ф.', room: '217' },
    null,
    { subject: 'Вероятность и статистика', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Технология', teacher: 'Хасаншин А.Р.', room: '122' },
  ],
};

const schedule8A: Record<number, (LessonEntry | null)[]> = {
  1: [
    { subject: 'Разговоры о важном', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    null,
    { subject: 'Технология / Тур.яз', groups: [
      { group: '1', teacher: 'Хасаншин А.Р.', room: '122' },
      { group: '2', teacher: 'Эрдаг Э.Э.', room: '102' },
    ]},
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '119' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Хакимов А.Т.', room: '118' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
  ],
  2: [
    { subject: 'род.яз(рус) / род.яз(тат)', groups: [
      { group: '1', teacher: 'Хабибуллина А.Ф.', room: '210' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Геометрия', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.', room: '207' },
    { subject: 'Род.лит(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Хабибуллина А.Ф.', room: '210' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    null,
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    { subject: 'Классный час', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Литература', teacher: 'Сабитова Л.М.', room: '207' },
  ],
  3: [
    { subject: 'род.яз(рус) / род.яз(тат)', groups: [
      { group: '1', teacher: 'Хабибуллина А.Ф.', room: '210' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    null,
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Хакимов А.Т.', room: '118' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    { subject: 'Физика', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Информатика (1) / Технология', groups: [
      { group: '1', teacher: 'Куряев М.Ю.', room: '209' },
      { group: '2', teacher: 'Хасаншин А.Р.', room: '122' },
    ]},
  ],
  4: [
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Джиу-джитсу', teacher: 'Калислямов А.А.' },
    { subject: 'ОБЗР', teacher: 'Сулейманов Р.Н.', room: '104' },
    null,
    { subject: 'Химия', teacher: 'Иванов Р.В.', room: '103' },
    { subject: 'Геометрия', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Россия — мои горизонты', teacher: '' },
    { subject: 'ИТР', teacher: '' },
  ],
  5: [
    { subject: 'Тур.яз / Информатика', groups: [
      { group: '1', teacher: 'Эрдаг Э.Э.', room: '102' },
      { group: '2', teacher: 'Валиев Д.Р.', room: '212' },
    ]},
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '116' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Хакимов А.Т.', room: '118' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    null,
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Тур.яз (1) / Информатика (1)', groups: [
      { group: '1', teacher: 'Эрдаг Э.Э.', room: '212' },
      { group: '2', teacher: 'Валиев Д.Р.' },
    ]},
    { subject: 'Китап time', teacher: 'Сабитова Л.М.', room: '207' },
  ],
  6: [
    { subject: 'Вероятность и статистика', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Информатика / Тур.яз (1)', groups: [
      { group: '1', teacher: '', room: '' },
      { group: '2', teacher: 'Эрдаг Э.Э.', room: '102' },
    ]},
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    { subject: 'Физкультура (1)', teacher: 'Калислямов А.А.' },
    null,
    { subject: 'Литература', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Английский (1) / Английский (1)', groups: [
      { group: '1', teacher: 'Хакимов А.Т.', room: '117' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '101' },
    ]},
  ],
};

const schedule8B: Record<number, (LessonEntry | null)[]> = {
  1: [
    { subject: 'Разговоры о важном', teacher: 'Исмагилова З.М.', room: '206' },
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '103' },
    null,
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
    { subject: 'Вероятность и статистика', teacher: 'Иванов Р.В.', room: '103' },
  ],
  2: [
    { subject: 'Геометрия', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Литература', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Физкультура (1)', teacher: 'Калислямов А.А.' },
    { subject: 'ОБЗР', teacher: 'Сулейманов Р.Н.', room: '103' },
    null,
    { subject: 'Английский / Технология', groups: [
      { group: '1', teacher: 'Исхаков Н.И.', room: '117' },
      { group: '2', teacher: 'Хасаншин А.Р.', room: '122' },
    ]},
    { subject: 'Классный час', teacher: 'Исмагилова З.М.', room: '206' },
    { subject: 'Химия', teacher: 'Иванов Р.В.', room: '103' },
  ],
  3: [
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Информатика / Тур.яз (1)', groups: [
      { group: '1', teacher: 'Куряев М.Ю.', room: '222' },
      { group: '2', teacher: 'Эрдаг Э.Э.', room: '102' },
    ]},
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    null,
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Род.лит(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Исхаков Н.И.', room: '117' },
      { group: '2', teacher: 'Сибгатуллина Л.М.', room: '123' },
    ]},
  ],
  4: [
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'Геометрия', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Литература', teacher: 'Сабитова Л.М.', room: '207' },
    null,
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    { subject: 'Химия', teacher: 'Иванов Р.В.', room: '103' },
    { subject: 'Россия — мои горизонты', teacher: '' },
    { subject: 'ИТР', teacher: '' },
  ],
  5: [
    { subject: 'Физика', teacher: 'Файзуллин И.Х.', room: '208' },
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    null,
    { subject: 'Информатика (1) / Информатика (1)', groups: [
      { group: '1', teacher: 'Куряев М.Ю.', room: '209' },
      { group: '2', teacher: 'Валиев Д.Р.', room: '212' },
    ]},
    { subject: 'Китап time', teacher: 'Исмагилова З.М.', room: '206' },
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
  ],
  6: [
    { subject: 'Английский (1)', groups: [
      { group: '1', teacher: 'Исхаков Н.И.', room: '117' },
      { group: '2', teacher: 'Сибгатуллина Л.М.', room: '123' },
    ]},
    { subject: 'Джиу-джитсу', teacher: 'Калислямов А.А.' },
    { subject: 'Тур.яз (1) / Английский (1)', groups: [
      { group: '1', teacher: 'Эрдаг Э.Э.', room: '102' },
      { group: '2', teacher: 'Сибгатуллина Л.М.', room: '123' },
    ]},
    { subject: 'Тур.яз / Информатика', groups: [
      { group: '1', teacher: 'Эрдаг Э.Э.', room: '102' },
      { group: '2', teacher: 'Валиев Д.Р.', room: '212' },
    ]},
    null,
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '116' },
  ],
};

const schedule8C: Record<number, (LessonEntry | null)[]> = {
  1: [
    { subject: 'Разговоры о важном', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '102' },
    { subject: 'Алгебра', teacher: 'Шавалеева Л.Р.', room: '101' },
    null,
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Род.лит(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
  ],
  2: [
    { subject: 'Литература', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    { subject: 'Химия', teacher: 'Иванов Р.В.', room: '103' },
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    null,
    { subject: 'Геометрия', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'Классный час', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
  ],
  3: [
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'Алгебра', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'Информатика / Информатика', groups: [
      { group: '1', teacher: 'Куряев М.Ю.', room: '222' },
      { group: '2', teacher: 'Валиев Д.Р.', room: '212' },
    ]},
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    null,
    { subject: 'Алгебра', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
  ],
  4: [
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Геометрия', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'Литература', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Химия', teacher: 'Иванов Р.В.', room: '103' },
    null,
    { subject: 'ОБЗР', teacher: 'Сулейманов Р.Н.', room: '104' },
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'Россия — мои горизонты', teacher: '' },
    { subject: 'ИТР', teacher: '' },
  ],
  5: [
    { subject: 'Английский (1) / Тур.яз (1)', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Галиев Р.Р.', room: '101' },
    ]},
    { subject: 'Физика', teacher: 'Валиев Д.Р.', room: '213' },
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Тур.яз / Технология', groups: [
      { group: '1', teacher: 'Эрдаг Э.Э.', room: '102' },
      { group: '2', teacher: 'Хасаншин А.Р.', room: '122' },
    ]},
    null,
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '116' },
  ],
  6: [
    { subject: 'Джиу-джитсу', teacher: 'Калислямов А.А.' },
    { subject: 'Алгебра', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'Информатика (1) / Информатика (1)', groups: [
      { group: '1', teacher: 'Куряев М.Ю.', room: '209' },
      { group: '2', teacher: 'Валиев Д.Р.', room: '212' },
    ]},
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    null,
    { subject: 'Вероятность и статистика', teacher: 'Шавалеева Л.Р.', room: '101' },
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
  ],
};

const schedule9A: Record<number, (LessonEntry | null)[]> = {
  1: [
    { subject: 'Разговоры о важном', teacher: 'Хасанова Г.Н.', room: '104' },
    { subject: 'Физика', teacher: 'Валиев Д.Р.', room: '212' },
    { subject: 'Вероятность и статистика', teacher: 'Иванов Р.В.', room: '103' },
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    null,
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'Информатика (1)', teacher: 'Шамсеев А.Р.', room: '209' },
  ],
  2: [
    { subject: 'Турецкий язык', teacher: 'Эрдаг Э.Э.', room: '102' },
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
    { subject: 'Литература', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Геометрия', teacher: 'Чебарёва Е.Е.', room: '222' },
    null,
    { subject: 'Английский язык', teacher: 'Хакимов А.Т.', room: '118' },
    { subject: 'Классный час', teacher: 'Хасанова Г.Н.', room: '104' },
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
  ],
  3: [
    { subject: 'Информатика', teacher: 'Шамсеев А.Р.', room: '209' },
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Английский язык', teacher: 'Хакимов А.Т.', room: '118' },
    { subject: 'Химия', teacher: 'Иванов Р.В.', room: '103' },
    null,
    { subject: 'ОБЗР', teacher: 'Сулейманов Р.Н.', room: '102' },
    { subject: 'Русский язык (1)', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'род.яз', teacher: 'Хасанова Г.Н.', room: '104' },
  ],
  4: [
    { subject: 'Джиу-джитсу', teacher: 'Калислямов А.А.' },
    { subject: 'Алгебра', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Физика', teacher: 'Валиев Д.Р.', room: '212' },
    { subject: 'Алгебра', teacher: 'Чебарёва Е.Е.', room: '222' },
    null,
    { subject: 'Литература', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'род.яз', teacher: 'Хасанова Г.Н.', room: '104' },
    { subject: 'Россия — мои горизонты', teacher: '' },
    { subject: 'ИТР', teacher: '' },
  ],
  5: [
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'род.яз', teacher: 'Хасанова Г.Н.', room: '104' },
    { subject: 'Геометрия', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Английский язык', teacher: 'Хакимов А.Т.', room: '118' },
    null,
    { subject: 'Химия', teacher: 'Иванов Р.В.', room: '103' },
    null,
    { subject: 'Математика (1)', teacher: 'Чебарёва Е.Е.', room: '222' },
  ],
  6: [
    { subject: 'Обществознание', teacher: 'Хусаинов В.Ф.', room: '217' },
    { subject: 'Литература', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Алгебра', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
  ],
};

const schedule9B: Record<number, (LessonEntry | null)[]> = {
  1: [
    { subject: 'Разговоры о важном', teacher: 'Даутова А.А.', room: '116' },
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '102' },
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    null,
    { subject: 'Физика', teacher: 'Валиев Д.Р.', room: '212' },
    { subject: 'Литература', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '212' },
  ],
  2: [
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    { subject: 'Информатика / Тур.яз', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Эрдаг Э.Э.', room: '102' },
    ]},
    { subject: 'Классный час', teacher: 'Даутова А.А.', room: '116' },
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    null,
    { subject: 'Геометрия', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '119' },
  ],
  3: [
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Информатика (1) / Информатика', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Валиев Д.Р.', room: '212' },
    ]},
    { subject: 'Род.лит(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'ОБЗР', teacher: 'Сулейманов Р.Н.', room: '102' },
    null,
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    { subject: 'Математика (1)', teacher: 'Маннанов Р.Р.', room: '119' },
  ],
  4: [
    { subject: 'Литература', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    null,
    { subject: 'Геометрия', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Джиу-джитсу', teacher: 'Калислямов А.А.', room: '116' },
    { subject: 'Россия — мои горизонты', teacher: '' },
    { subject: 'ИТР', teacher: '' },
  ],
  5: [
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Алгебра', teacher: 'Маннанов Р.Р.', room: '119' },
    { subject: 'Физика', teacher: 'Валиев Д.Р.', room: '212' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Исхаков Н.И.', room: '117' },
    ]},
    null,
    { subject: 'Русский язык', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Китап time', teacher: 'Даутова А.А.' },
    { subject: 'Химия', teacher: 'Иванов Р.В.', room: '103' },
  ],
  6: [
    { subject: 'Тур.яз / Информатика (1)', groups: [
      { group: '1', teacher: 'Эрдаг Э.Э.', room: '102' },
      { group: '2', teacher: 'Валиев Д.Р.', room: '212' },
    ]},
    { subject: 'Физика', teacher: 'Валиев Д.Р.', room: '212' },
    { subject: 'Литература', teacher: 'Сабитова Л.М.', room: '207' },
    { subject: 'Русский язык (1)', teacher: 'Сабитова Л.М.', room: '207' },
    null,
    { subject: 'Обществознание', teacher: 'Хусаинов В.Ф.', room: '217' },
    { subject: 'Геометрия', teacher: 'Маннанов Р.Р.', room: '119' },
  ],
};

const schedule10A: Record<number, (LessonEntry | null)[]> = {
  1: [
    { subject: 'Разговоры о важном', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Алгебра', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Алгебра', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Русский язык', teacher: 'Шарафутдинова О.В.', room: '208' },
    null,
    { subject: 'Вероятность и статистика', teacher: 'Иванов Р.В.', room: '103' },
    { subject: 'Физика', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Обществознание', teacher: 'Хусаинов В.Ф.', room: '217' },
  ],
  2: [
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'Физика', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Геометрия', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Литература', teacher: 'Шарафутдинова О.В.', room: '208' },
    null,
    { subject: 'ОБЗР', teacher: 'Сулейманов Р.Н.', room: '103' },
    { subject: 'Классный час', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Математика (1)', teacher: 'Чебарёва Е.Е.', room: '222' },
  ],
  3: [
    { subject: 'Русский язык', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'Физкультура (1)', teacher: 'Сулейманов Р.Н.' },
    { subject: 'Род.лит.', teacher: 'Фатхиева Г.З.', room: '210' },
    { subject: 'Информатика', teacher: 'Валиев Д.Р.', room: '212' },
    null,
    { subject: 'Физика', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'род.яз', teacher: 'Фатхиева Г.З.', room: '210' },
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '222' },
  ],
  4: [
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '116' },
    { subject: 'Физкультура', teacher: 'Калислямов А.А.' },
    { subject: 'Алгебра', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'род.яз', teacher: 'Фатхиева Г.З.', room: '210' },
    null,
    { subject: 'Физика', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    { subject: 'Россия — мои горизонты', teacher: '' },
    { subject: 'ИТР', teacher: '' },
  ],
  5: [
    { subject: 'Обществознание', teacher: 'Хусаинов В.Ф.', room: '217' },
    { subject: 'Геометрия', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Английский язык', teacher: 'Сибгатуллина Л.М.', room: '123' },
    { subject: 'Геометрия', teacher: 'Чебарёва Е.Е.', room: '222' },
    null,
    { subject: 'Литература', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'Китап time', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Русский язык (1)', teacher: 'Шарафутдинова О.В.', room: '208' },
  ],
  6: [
    { subject: 'Литература', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'Физика', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Химия', teacher: 'Иванов Р.В.', room: '103' },
    { subject: 'Алгебра', teacher: 'Чебарёва Е.Е.', room: '222' },
    null,
    { subject: 'Английский язык', teacher: 'Сибгатуллина Л.М.', room: '123' },
    { subject: 'Английский язык', teacher: 'Сибгатуллина Л.М.' },
  ],
};

const schedule10B: Record<number, (LessonEntry | null)[]> = {
  1: [
    { subject: 'Разговоры о важном', teacher: 'Хасаншина Э.Р.', room: '102' },
    { subject: 'Русский язык', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'Физика', teacher: 'Валиев Д.Р.', room: '212' },
    { subject: 'Алгебра', teacher: 'Чебарёва Е.Е.', room: '222' },
    null,
    { subject: 'Алгебра', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Вероятность и статистика', teacher: 'Иванов Р.В.', room: '103' },
    { subject: 'Русский язык (1)', teacher: 'Шарафутдинова О.В.', room: '208' },
  ],
  2: [
    { subject: 'Литература', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'Геометрия', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Фатхиева Г.З.', room: '101' },
    ]},
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    null,
    { subject: 'Информатика / Информатика', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Куряев М.Ю.', room: '208' },
    ]},
    { subject: 'Классный час', teacher: 'Хасаншина Э.Р.', room: '102' },
    { subject: 'Физкультура', teacher: 'Калислямов А.А.' },
  ],
  3: [
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Хакимов А.Т.', room: '118' },
    ]},
    { subject: 'Русский язык', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Фатхиева Г.З.', room: '101' },
    ]},
    null,
    { subject: 'Информатика / Тур.яз', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Галиев Р.Р.', room: '116' },
    ]},
    { subject: 'ОБЗР', teacher: 'Сулейманов Р.Н.', room: '101' },
    { subject: 'Физкультура', teacher: 'Калислямов А.А.' },
  ],
  4: [
    { subject: 'Алгебра', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '116' },
    { subject: 'Род.лит', teacher: 'Хасаншина Э.Р.', room: '117' },
    { subject: 'Информатика (1)', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Куряев М.Ю.', room: '212' },
    ]},
    null,
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Хакимов А.Т.', room: '118' },
    ]},
    { subject: 'Россия — мои горизонты', teacher: '' },
    { subject: 'ИТР', teacher: '' },
  ],
  5: [
    { subject: 'Геометрия', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Информатика / Информатика', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Куряев М.Ю.', room: '212' },
    ]},
    { subject: 'Литература', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'Информатика / Информатика', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Куряев М.Ю.', room: '212' },
    ]},
    null,
    { subject: 'Геометрия', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Хакимов А.Т.', room: '118' },
    ]},
    { subject: 'Китап time', teacher: 'Хасаншина Э.Р.' },
  ],
  6: [
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    { subject: 'Алгебра', teacher: 'Чебарёва Е.Е.', room: '222' },
    { subject: 'Литература', teacher: 'Шарафутдинова О.В.', room: '208' },
    { subject: 'Химия', teacher: 'Иванов Р.В.', room: '103' },
    null,
    { subject: 'Физика', teacher: 'Валиев Д.Р.', room: '212' },
    { subject: 'Обществознание', teacher: 'Хусаинов В.Ф.', room: '217' },
    { subject: 'Английский язык', groups: [
      { group: '1', teacher: 'Сибгатуллина Л.М.', room: '123' },
      { group: '2', teacher: 'Хакимов А.Т.', room: '118' },
    ]},
  ],
};

const schedule11A: Record<number, (LessonEntry | null)[]> = {
  1: [
    { subject: 'Разговоры о важном', teacher: 'Фатхиев А.Х.', room: '101' },
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Алгебра', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Геометрия', teacher: 'Шавалеев А.А.', room: '213' },
    null,
    { subject: 'Литература', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Информатика / Информатика', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Шамсеев А.Р.', room: '212' },
    ]},
    { subject: 'Русский язык (1)', teacher: 'Фасхутдинова Р.И.', room: '215' },
  ],
  2: [
    { subject: 'Алгебра', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'Информатика / Информатика', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Шамсеев А.Р.', room: '123' },
    ]},
    null,
    { subject: 'Английский язык', teacher: 'Хабибуллин А.Н.', room: '123' },
    { subject: 'Физкультура (1)', teacher: 'Калислямов А.А.' },
    { subject: 'Классный час', teacher: 'Фатхиев А.Х.', room: '101' },
  ],
  3: [
    { subject: 'Алгебра', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Английский язык', teacher: 'Хабибуллин А.Н.', room: '123' },
    { subject: 'Информатика / Информатика', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Шамсеев А.Р.', room: '102' },
    ]},
    { subject: 'Геометрия', teacher: 'Шавалеев А.А.', room: '213' },
    null,
    { subject: 'Литература', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Английский язык', teacher: 'Хабибуллин А.Н.', room: '118' },
    { subject: 'Вероятность и статистика', teacher: 'Шавалеев А.А.', room: '213' },
  ],
  4: [
    { subject: 'Русский язык', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'Турецкий язык', teacher: 'Хамидуллин Р.Р.', room: '208' },
    { subject: 'Информатика / Информатика', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Шамсеев А.Р.', room: '208' },
    ]},
    { subject: 'География', teacher: 'Мутыгуллина А.Н.', room: '118' },
    null,
    { subject: 'История', teacher: 'Насибуллин И.И.', room: '217' },
    { subject: 'Геометрия', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Род.лит', teacher: 'Фатхиев А.Х.' },
  ],
  5: [
    { subject: 'Информатика / Информатика', groups: [
      { group: '1', teacher: 'Шамсеев А.Р.', room: '209' },
      { group: '2', teacher: 'Шамсеев А.Р.', room: '103' },
    ]},
    { subject: 'Физкультура', teacher: 'Сулейманов Р.Н.' },
    { subject: 'Литература', teacher: 'Фасхутдинова Р.И.', room: '215' },
    { subject: 'ОБЗР', teacher: 'Сулейманов Р.Н.', room: '101' },
    null,
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
    { subject: 'Китап time', teacher: 'Фатхиев А.Х.' },
    { subject: 'род.яз(тат) / род.яз(рус)', groups: [
      { group: '1', teacher: 'Исмагилова З.М.', room: '206' },
      { group: '2', teacher: 'Хасанова Г.Н.', room: '104' },
    ]},
  ],
  6: [
    { subject: 'Химия', teacher: 'Иванов Р.В.', room: '103' },
    { subject: 'Биология', teacher: 'Даутова А.А.', room: '116' },
    { subject: 'Алгебра', teacher: 'Шавалеев А.А.', room: '213' },
    { subject: 'Физика', teacher: 'Шавалеев А.А.', room: '213' },
  ],
};

const allSchedules: Record<string, Record<number, (LessonEntry | null)[]>> = {
  '5А': schedule5A,
  '6А': schedule6A,
  '7А': schedule7A,
  '7Б': schedule7B,
  '8А': schedule8A,
  '8Б': schedule8B,
  '8В': schedule8C,
  '9А': schedule9A,
  '9Б': schedule9B,
  '10А': schedule10A,
  '10Б': schedule10B,
  '11А': schedule11A,
};

// Преобразуем в массив Lesson
export function generateLessons(): Lesson[] {
  const lessons: Lesson[] = [];
  let idCounter = 1;

  Object.entries(allSchedules).forEach(([className, weekSchedule]) => {
    Object.entries(weekSchedule).forEach(([dayStr, dayLessons]) => {
      const dayOfWeek = parseInt(dayStr);
      
      dayLessons.forEach((entry, idx) => {
        if (!entry) return;
        
        // Маппинг idx на timeSlot:
        // ПН: idx 0=Разг(slot 2), idx 1=урок2(slot 3), idx 2=урок3(slot 4), idx 3=урок4(slot 5),
        //     idx 4=обед(null), idx 5=урок5(slot 7), idx 6=урок6(slot 8), idx 7=урок7(slot 9), idx 8=урок8(slot 10)
        // ВТ-ПТ: idx 0=урок1(slot 1), idx 1=урок2(slot 2), idx 2=урок3(slot 3), idx 3=урок4(slot 4),
        //        idx 4=обед(null), idx 5=урок5(slot 6), idx 6=урок6(slot 7), idx 7=урок7(slot 8), idx 8=урок8(slot 9)
        // СБ: idx 0=урок1(slot 1), idx 1=урок2(slot 2), idx 2=урок3(slot 3), idx 3=урок4(slot 4),
        //     idx 4=обед(null), idx 5=урок5(slot 5)
        
        let timeSlot: number;
        if (dayOfWeek === 1) {
          // Понедельник: Линейка отдельно, Разговоры=slot2, уроки 2-4=slot3-5, обед=slot6, уроки 5-8=slot7-10
          const pnMap = [2, 3, 4, 5, 6, 7, 8, 9, 10];
          timeSlot = pnMap[idx] || idx + 1;
        } else if (dayOfWeek === 6) {
          // Суббота: уроки 1-4=slot1-4, обед=slot5, урок5=slot5
          const sbMap = [1, 2, 3, 4, 5, 5, 6, 7, 8];
          timeSlot = sbMap[idx] || idx + 1;
        } else {
          // Вторник-Пятница: уроки 1-4=slot1-4, обед=slot5, уроки 5-8=slot6-9
          const wtMap = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          timeSlot = wtMap[idx] || idx + 1;
        }

        if (isGroupLesson(entry)) {
          // Групповой урок - создаём отдельные записи для каждой группы
          entry.groups.forEach((g) => {
            if (!g.teacher) return;
            lessons.push({
              id: `lesson-${idCounter++}`,
              subject: entry.subject,
              teacher: g.teacher,
              room: g.room || '',
              className,
              group: g.group,
              dayOfWeek,
              timeSlot,
              tags: [],
            });
          });
        } else {
          // Добавляем урок даже если teacher пустой (для "Россия — мои горизонты", "ИТР" и т.д.)
          lessons.push({
            id: `lesson-${idCounter++}`,
            subject: entry.subject,
            teacher: entry.teacher || '',
            room: entry.room || '',
            className,
            dayOfWeek,
            timeSlot,
            tags: [],
          });
        }
      });
    });
  });

  return lessons;
}

export const schoolClasses = ['5А', '6А', '7А', '7Б', '8А', '8Б', '8В', '9А', '9Б', '10А', '10Б', '11А'];

export const schoolTeachers = [
  'Фасхутдинова Р.И.', 'Шавалеева Л.Р.', 'Сибгатуллина Л.М.', 'Хакимов А.Т.',
  'Даутова А.А.', 'Хасаншин А.Р.', 'Эрдаг Э.Э.', 'Галиев Р.Р.', 'Шамсеев А.Р.',
  'Калислямов А.А.', 'Исмагилова З.М.', 'Хасанова Г.Н.', 'Мингараев И.И.',
  'Хуснуллина З.Д.', 'Шарафутдинова О.В.', 'Исхаков Н.И.', 'Валиев Д.Р.',
  'Мутыгуллина А.Н.', 'Сулейманов Р.Н.', 'Фатхиева Г.З.', 'Маннанов Р.Р.',
  'Файзуллин И.Х.', 'Хусаинов В.Ф.', 'Хабибуллина А.Ф.', 'Шавалеев А.А.',
  'Галеев Ф.А.', 'Насибуллин И.И.', 'Сабитова Л.М.', 'Иванов Р.В.',
  'Куряев М.Ю.', 'Чебарёва Е.Е.', 'Хасаншина Э.Р.', 'Фатхиев А.Х.',
  'Хабибуллин А.Н.', 'Хамидуллин Р.Р.',
];

export const schoolRooms = [
  '101', '102', '103', '104', '116', '117', '118', '119',
  '122', '123', '206', '207', '208', '209', '210', '212',
  '213', '215', '217', '222', 'Спортзал',
];
