
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  Award, 
  Target, 
  User, 
  List,
  CalendarDays,
  Settings,
  Bot,
  Home,
  Clock,
  Users
} from 'lucide-react';
import { calculateUserLevel } from '@/utils/userLevelCalculator';

export const AppSidebar = () => {
  const { userProfile } = useUser();
  const location = useLocation();
  
  const level = userProfile ? calculateUserLevel(userProfile).level : 0;
  
  const menuItems = [
    { title: 'Inicio', path: '/', icon: Home },
    { title: 'Dashboard', path: '/dashboard', icon: BarChart2 },
    { title: 'Hábitos', path: '/habits', icon: CalendarDays },
    { title: 'Logros', path: '/achievements', icon: Award },
    { title: 'Metas', path: '/goals', icon: Target },
    { title: 'Plan', path: '/plan', icon: List },
    { title: 'Coach IA', path: '/ai-coach', icon: Bot },
    { title: 'Comunidad', path: '/community', icon: Users },
    { title: 'Recordatorios', path: '/reminders', icon: Clock },
    { title: 'Perfil', path: '/profile', icon: User },
    { title: 'Configuración', path: '/settings', icon: Settings },
  ];

  return (
    <Sidebar variant="inset" className="border-r border-evolve-purple/20">
      <SidebarHeader className="p-4 border-b border-evolve-purple/20">
        <Link to="/" className="flex items-center gap-2 p-2">
          <div className="font-bold text-xl flex items-center">
            <span className="text-evolve-purple">Alpha</span>Evolve
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.path}
                    tooltip={item.title}
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {userProfile && (
        <SidebarFooter>
          <div className="p-4 border-t border-evolve-purple/20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-evolve-purple/20 rounded-full flex items-center justify-center border-2 border-evolve-purple">
                <span className="font-bold">{level}</span>
              </div>
              <div>
                <p className="font-medium">{userProfile.name}</p>
                <p className="text-xs text-gray-400">Nivel {level}</p>
              </div>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
};

export default AppSidebar;
