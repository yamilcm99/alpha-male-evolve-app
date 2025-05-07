
import React, { ReactNode } from 'react';
import { useUser } from '@/context/UserContext';
import { Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Breadcrumbs from './Breadcrumbs';
import AppSidebar from './Sidebar';
import { SidebarProvider, SidebarTrigger, SidebarRail, SidebarInset } from '@/components/ui/sidebar';

type PageLayoutProps = {
  children: ReactNode;
  requiresOnboarding?: boolean;
};

const PageLayout = ({ children, requiresOnboarding = true }: PageLayoutProps) => {
  const { isOnboarded } = useUser();

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
