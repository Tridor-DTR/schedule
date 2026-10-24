import { useState, useRef } from 'react';
import { X, GripVertical, Plus } from 'lucide-react';

export interface FilterBlock {
  id: string;
  type: 'teacher' | 'class' | 'room' | 'day' | 'operator' | 'parenthesis';
  value: string;
}

interface FilterBuilderProps {
  blocks: FilterBlock[];
  onChange: (blocks: FilterBlock[]) => void;
  teachers: string[];
  classes: string[];
  rooms: string[];
  days: string[];
  theme: any;
}

export default function FilterBuilder({ blocks, onChange, teachers, classes, rooms, days, theme }: FilterBuilderProps) {
  const [mode, setMode] = useState<'blocks' | 'text'>('blocks');
  const [textValue, setTextValue] = useState('');
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const operators = ['И', 'ИЛИ', 'НЕ'];
  const parentheses = ['(', ')'];

  const addBlock = (type: FilterBlock['type'], value: string) => {
    const newBlock: FilterBlock = {
      id: Date.now().toString() + Math.random(),
      type,
      value,
    };
    onChange([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    onChange(blocks.filter(b => b.id !== id));
  };

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    
    const newBlocks = [...blocks];
    const draggedItem = newBlocks[dragItem.current];
    newBlocks.splice(dragItem.current, 1);
    newBlocks.splice(dragOverItem.current, 0, draggedItem);
    
    dragItem.current = null;
    dragOverItem.current = null;
    onChange(newBlocks);
  };

  const switchToText = () => {
    const text = blocks.map(b => {
      if (b.type === 'operator') return ` ${b.value} `;
      if (b.type === 'parenthesis') return b.value;
      return b.value;
    }).join('');
    setTextValue(text);
    setMode('text');
  };

  const switchToBlocks = () => {
    // Парсим текст обратно в блоки (упрощённая версия)
    const newBlocks: FilterBlock[] = [];
    const parts = textValue.split(/\s+/);
    
    parts.forEach(part => {
      if (operators.includes(part)) {
        newBlocks.push({ id: Date.now().toString() + Math.random(), type: 'operator', value: part });
      } else if (parentheses.includes(part)) {
        newBlocks.push({ id: Date.now().toString() + Math.random(), type: 'parenthesis', value: part });
      } else if (teachers.includes(part)) {
        newBlocks.push({ id: Date.now().toString() + Math.random(), type: 'teacher', value: part });
      } else if (classes.includes(part)) {
        newBlocks.push({ id: Date.now().toString() + Math.random(), type: 'class', value: part });
      } else if (rooms.includes(part)) {
        newBlocks.push({ id: Date.now().toString() + Math.random(), type: 'room', value: part });
      } else if (days.includes(part)) {
        newBlocks.push({ id: Date.now().toString() + Math.random(), type: 'day', value: part });
      }
    });
    
    onChange(newBlocks);
    setMode('blocks');
  };

  const getBlockColor = (block: FilterBlock) => {
    switch (block.type) {
      case 'teacher': return '#f06595';
      case 'class': return '#5c7cfa';
      case 'room': return '#20c997';
      case 'day': return '#fcc419';
      case 'operator': return '#845ef7';
      case 'parenthesis': return '#868e96';
      default: return '#868e96';
    }
  };

  return (
    <div className="p-4 rounded-xl animate-fade-in" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      {/* Mode toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Конструктор фильтров</h3>
        <div className="flex gap-1 rounded-lg overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => mode === 'text' && switchToBlocks()}
            className="px-3 py-1 text-xs font-medium transition-colors"
            style={{
              backgroundColor: mode === 'blocks' ? theme.primaryColor : 'transparent',
              color: mode === 'blocks' ? 'white' : 'var(--text-secondary)',
            }}
          >
            Блоки
          </button>
          <button
            onClick={() => mode === 'blocks' && switchToText()}
            className="px-3 py-1 text-xs font-medium transition-colors"
            style={{
              backgroundColor: mode === 'text' ? theme.primaryColor : 'transparent',
              color: mode === 'text' ? 'white' : 'var(--text-secondary)',
            }}
          >
            Текст
          </button>
        </div>
      </div>

      {mode === 'blocks' ? (
        <>
          {/* Dropdowns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
            <select
              onChange={(e) => e.target.value && addBlock('teacher', e.target.value)}
              className="px-3 py-2 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              defaultValue=""
            >
              <option value="">Учитель...</option>
              {teachers.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select
              onChange={(e) => e.target.value && addBlock('class', e.target.value)}
              className="px-3 py-2 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              defaultValue=""
            >
              <option value="">Класс...</option>
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              onChange={(e) => e.target.value && addBlock('room', e.target.value)}
              className="px-3 py-2 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              defaultValue=""
            >
              <option value="">Кабинет...</option>
              {rooms.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select
              onChange={(e) => e.target.value && addBlock('day', e.target.value)}
              className="px-3 py-2 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              defaultValue=""
            >
              <option value="">День...</option>
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <div className="flex gap-1">
              {operators.map(op => (
                <button
                  key={op}
                  onClick={() => addBlock('operator', op)}
                  className="flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                  style={{ backgroundColor: '#845ef720', color: '#845ef7', border: '1px solid #845ef740' }}
                >
                  {op}
                </button>
              ))}
              {parentheses.map(p => (
                <button
                  key={p}
                  onClick={() => addBlock('parenthesis', p)}
                  className="flex-1 px-2 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105"
                  style={{ backgroundColor: '#868e9620', color: '#868e96', border: '1px solid #868e9640' }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Blocks area */}
          <div className="min-h-[60px] p-3 rounded-lg flex flex-wrap gap-2 items-center" style={{ backgroundColor: 'var(--bg-tertiary)', border: '2px dashed var(--border-color)' }}>
            {blocks.length === 0 ? (
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Добавьте блоки из списков выше или перетащите их сюда
              </span>
            ) : (
              blocks.map((block, index) => {
                const color = getBlockColor(block);
                return (
                  <div
                    key={block.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium cursor-move transition-all hover:scale-105"
                    style={{
                      backgroundColor: color + '20',
                      color: color,
                      border: `1px solid ${color}40`,
                    }}
                  >
                    <GripVertical className="w-3 h-3 opacity-50" />
                    <span>{block.value}</span>
                    <button
                      onClick={() => removeBlock(block.id)}
                      className="ml-1 opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {blocks.length > 0 && (
            <button
              onClick={() => onChange([])}
              className="mt-3 text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{ color: '#ff6b6b', backgroundColor: '#ff6b6b10' }}
            >
              Очистить все
            </button>
          )}
        </>
      ) : (
        <>
          {/* Text mode */}
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Например: 5А ИЛИ 6А И Математика"
            className="w-full px-4 py-3 rounded-lg text-sm font-mono resize-none"
            rows={4}
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
          />
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            Используйте операторы: И, ИЛИ, НЕ. Скобки: ( ). Переключитесь в режим блоков для визуального редактирования.
          </p>
        </>
      )}
    </div>
  );
}
