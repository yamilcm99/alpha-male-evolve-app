
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar = () => {
  const { userProfile } = useUser();
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-evolve-dark/75 border-b border-evolve-purple/30 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isMobile && (
              <SidebarTrigger />
            )}
            {!isMobile && userProfile && (
              <div>
                <h2 className="text-lg font-semibold">Bienvenido, {userProfile.name}</h2>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-evolve-purple text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">2</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="text-white">
              <Search size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
