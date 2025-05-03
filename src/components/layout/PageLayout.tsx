
import React, { ReactNode } from 'react';
import { useUser } from '@/context/UserContext';
import { Navigate } from 'react-router-dom';
import NavBar from './NavBar';

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-evolve-dark to-black text-white">
      <NavBar />
      <main className="flex-grow p-4 md:p-6">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
