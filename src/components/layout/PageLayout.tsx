
import React, { ReactNode, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Breadcrumbs from './Breadcrumbs';
import AppSidebar from './Sidebar';
import { SidebarProvider, SidebarTrigger, SidebarRail, SidebarInset } from '@/components/ui/sidebar';
import NotificationsPopover from '@/components/notifications/NotificationsPopover';

type PageLayoutProps = {
  children: ReactNode;
  requiresOnboarding?: boolean;
};

const PageLayout = ({ children, requiresOnboarding = true }: PageLayoutProps) => {
  const { isOnboarded } = useUser();
  
  // Verificar recordatorios o metas pendientes
  useEffect(() => {
    // Aquí se podría implementar la lógica para verificar recordatorios
    const checkReminders = () => {
      const reminders = localStorage.getItem('reminders');
      if (!reminders) return;
      
      const parsedReminders = JSON.parse(reminders);
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
      
      parsedReminders.forEach((reminder: any) => {
        if (reminder.enabled && reminder.days.includes(currentDay)) {
          const [reminderHour, reminderMinute] = reminder.time.split(':').map(Number);
          
          // Si la hora y minuto coinciden aproximadamente (dentro de un rango de 5 minutos)
          if (reminderHour === currentHour && 
              Math.abs(reminderMinute - currentMinute) <= 5) {
            // Aquí se podría mostrar una notificación
            console.log(`¡Recordatorio: ${reminder.title}!`);
          }
        }
      });
    };
    
    // Verificar recordatorios cada minuto
    const intervalId = setInterval(checkReminders, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Redirigir al onboarding si el usuario no ha completado el proceso
  if (requiresOnboarding && !isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-b from-evolve-dark to-black text-white">
        <AppSidebar />
        <SidebarRail />
        <SidebarInset className="flex flex-col">
          <NavBar />
          <div className="absolute top-3 right-16">
            <NotificationsPopover />
          </div>
          <main className="flex-grow p-4 md:p-6">
            <Breadcrumbs />
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PageLayout;
