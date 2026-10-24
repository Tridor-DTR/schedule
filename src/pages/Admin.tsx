import { useState } from 'react';
import { useApp } from '../store/AppContext';
import {
  Shield, Check, X, Clock, Building, Mail, Phone, User,
  Link2, Copy, AlertCircle, CheckCircle2, Users
} from 'lucide-react';

export default function Admin() {
  const { state, dispatch } = useApp();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!state.user || state.user.activeRole !== 'superadmin') {
    return (
      <div className="text-center py-16 animate-fade-in">
        <Shield className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Доступ только для суперадмина</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Переключитесь на роль «Суперадмин» в профиле</p>
      </div>
    );
  }

  const pendingApps = state.applications.filter(a => a.status === 'pending');
  const processedApps = state.applications.filter(a => a.status !== 'pending');

  const handleApprove = (id: string) => {
    dispatch({ type: 'UPDATE_APPLICATION', payload: { id, status: 'approved' } });
    setSelectedApp(id);
    setShowInviteModal(true);
  };

  const handleReject = (id: string) => {
    dispatch({ type: 'UPDATE_APPLICATION', payload: { id, status: 'rejected' } });
  };

  const inviteCode = 'FRC-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  const copyCode = () => {
    navigator.clipboard.writeText(inviteCode).catch(() => {});
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Управление</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Заявки учебных заведений</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Суперадмин</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="text-2xl font-bold" style={{ color: '#f59f00' }}>{pendingApps.length}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>На рассмотрении</div>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="text-2xl font-bold" style={{ color: '#69db7c' }}>{processedApps.filter(a => a.status === 'approved').length}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Одобрено</div>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="text-2xl font-bold" style={{ color: '#ff6b6b' }}>{processedApps.filter(a => a.status === 'rejected').length}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Отклонено</div>
        </div>
      </div>

      {/* Pending applications */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Clock className="w-5 h-5" style={{ color: '#f59f00' }} />
          На рассмотрении
        </h2>
        
        {pendingApps.length === 0 ? (
          <div className="text-center py-8 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <CheckCircle2 className="w-10 h-10 mx-auto mb-2" style={{ color: '#69db7c' }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Нет заявок на рассмотрении</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingApps.map(app => (
              <div key={app.id} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="w-4 h-4" style={{ color: state.theme.primaryColor }} />
                      <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>{app.name}</h3>
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: '#f59f0020', color: '#f59f00' }}>
                        {app.type === 'school' ? 'Школа' : app.type === 'university' ? 'ВУЗ' : app.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <User className="w-3 h-3" /> {app.contactName}
                      </div>
                      <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <Mail className="w-3 h-3" /> {app.email}
                      </div>
                      <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <Phone className="w-3 h-3" /> {app.phone}
                      </div>
                    </div>
                    <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                      Подана: {app.submittedAt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: '#69db7c' }}
                    >
                      <Check className="w-4 h-4" /> Одобрить
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-all hover:opacity-90"
                      style={{ backgroundColor: '#ff6b6b20', color: '#ff6b6b' }}
                    >
                      <X className="w-4 h-4" /> Отклонить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Processed applications */}
      {processedApps.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <CheckCircle2 className="w-5 h-5" style={{ color: '#69db7c' }} />
            Обработанные
          </h2>
          <div className="space-y-3">
            {processedApps.map(app => (
              <div key={app.id} className="p-4 rounded-xl flex items-center justify-between" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <div>
                    <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{app.name}</span>
                    <span className="text-xs ml-2" style={{ color: 'var(--text-muted)' }}>{app.contactName}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  app.status === 'approved' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                }`}>
                  {app.status === 'approved' ? 'Одобрено' : 'Отклонено'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invite modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowInviteModal(false)}>
          <div className="w-full max-w-md rounded-2xl p-6 animate-fade-in" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
            onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: '#69db7c' }} />
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Заявка одобрена!</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                Создайте приглашение для первого составителя этой школы.
              </p>
            </div>

            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>
                Одноразовый код приглашения (действует 24 часа):
              </label>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 rounded-lg text-lg font-mono font-bold text-center"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: state.theme.primaryColor }}>
                  {inviteCode}
                </code>
                <button
                  onClick={copyCode}
                  className="px-3 py-2 rounded-lg transition-all"
                  style={{ backgroundColor: state.theme.primaryColor + '20', color: state.theme.primaryColor }}
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-lg mb-4 flex items-start gap-2" style={{ backgroundColor: '#5c7cfa10', border: '1px solid #5c7cfa30' }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: state.theme.primaryColor }} />
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                После использования кода составитель сможет приглашать учителей и генерировать коды для учеников/родителей.
              </p>
            </div>

            <button
              onClick={() => setShowInviteModal(false)}
              className="w-full py-3 rounded-lg text-sm font-medium text-white"
              style={{ backgroundColor: state.theme.primaryColor }}
            >
              Готово
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
