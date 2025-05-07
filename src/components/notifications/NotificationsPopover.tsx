
import React, { useState, useEffect } from 'react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, Calendar, Trophy, Target, X } from 'lucide-react';
import { useHabits } from '@/context/HabitsContext';
import { useGoals } from '@/context/GoalsContext';
import { useAchievements } from '@/context/AchievementsContext';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'achievement' | 'goal' | 'habit' | 'system';
  read: boolean;
  createdAt: Date;
};

const NotificationsPopover = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { habits } = useHabits();
  const { goals } = useGoals();
  const { achievements } = useAchievements();
  
  // Cargar notificaciones guardadas
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      generateInitialNotifications();
    }
  }, []);
  
  // Crear notificaciones iniciales si no existen
  const generateInitialNotifications = () => {
    const initialNotifications: Notification[] = [];
    
    // Notificación de bienvenida al sistema
    initialNotifications.push({
      id: crypto.randomUUID(),
      title: '¡Bienvenido a AlphaEvolve!',
      message: 'Gracias por unirte a AlphaEvolve. Estamos aquí para ayudarte en tu camino de crecimiento.',
      type: 'system',
      read: false,
      createdAt: new Date()
    });
    
    // Recordatorios para hábitos
    habits.slice(0, 2).forEach(habit => {
      initialNotifications.push({
        id: crypto.randomUUID(),
        title: `Recordatorio: ${habit.name}`,
        message: `No olvides completar tu hábito de hoy para mantener tu racha.`,
        type: 'reminder',
        read: false,
        createdAt: new Date(Date.now() - Math.random() * 86400000) // Aleatorio en las últimas 24 horas
      });
    });
    
    // Meta próxima
    if (goals.length > 0) {
      const closestGoal = goals.find(g => !g.completed && g.deadline);
      if (closestGoal) {
        initialNotifications.push({
          id: crypto.randomUUID(),
          title: `Meta próxima a vencer: ${closestGoal.title}`,
          message: `Tu meta está próxima a vencer. ¡No pierdas el enfoque!`,
          type: 'goal',
          read: false,
          createdAt: new Date(Date.now() - 43200000) // 12 horas atrás
        });
      }
    }
    
    // Logros recientes
    const unlockedAchievements = achievements.filter(a => a.unlockedAt);
    if (unlockedAchievements.length > 0) {
      initialNotifications.push({
        id: crypto.randomUUID(),
        title: `¡Nuevo logro desbloqueado!`,
        message: `Has desbloqueado el logro "${unlockedAchievements[0].name}". ¡Felicidades!`,
        type: 'achievement',
        read: false,
        createdAt: new Date(Date.now() - 259200000) // 3 días atrás
      });
    }
    
    setNotifications(initialNotifications);
    localStorage.setItem('notifications', JSON.stringify(initialNotifications));
  };
  
  // Guardar notificaciones al cambiar
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications]);
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('notifications');
  };
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // Ordenar notificaciones por fecha (más recientes primero)
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Función para obtener el ícono según el tipo de notificación
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Calendar size={16} className="text-blue-400" />;
      case 'achievement': return <Trophy size={16} className="text-amber-400" />;
      case 'goal': return <Target size={16} className="text-green-400" />;
      case 'habit': return <Check size={16} className="text-purple-400" />;
      default: return <Bell size={16} className="text-gray-400" />;
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[370px] p-0 bg-evolve-dark text-white border-evolve-purple/30">
        <div className="p-3 border-b border-evolve-purple/20 flex items-center justify-between">
          <h3 className="font-medium">Notificaciones</h3>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
                Marcar todas como leídas
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={clearAllNotifications} className="h-8 text-xs">
              Limpiar
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[300px]">
          {sortedNotifications.length > 0 ? (
            <div>
              {sortedNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-3 border-b border-evolve-purple/10 hover:bg-evolve-dark/80 flex gap-3 ${
                    !notification.read ? 'bg-evolve-purple/5' : ''
                  }`}
                >
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5" 
                        onClick={() => removeNotification(notification.id)}
                      >
                        <X size={12} />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] text-gray-500">
                        {getRelativeTimeString(new Date(notification.createdAt))}
                      </span>
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-[10px] py-0"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Marcar como leída
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-400">
              <Bell size={24} className="mb-2 opacity-50" />
              <p>No tienes notificaciones</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

// Función para obtener tiempo relativo
const getRelativeTimeString = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);
  
  if (diffSecs < 60) return 'Hace un momento';
  if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`;
  if (diffHours < 24) return `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
  if (diffDays < 7) return `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
  
  // Fecha formateada para casos más antiguos
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  });
};

export default NotificationsPopover;
