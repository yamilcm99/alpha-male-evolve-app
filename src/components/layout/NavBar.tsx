
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Menu, User, BarChart2, Award, Target, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const { userProfile } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-evolve-dark border-b border-evolve-purple/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-evolve-purple">Alpha</span>Evolve
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-white hover:text-evolve-purple transition-colors">
              Dashboard
            </Link>
            <Link to="/habits" className="text-white hover:text-evolve-purple transition-colors">
              Hábitos
            </Link>
            <Link to="/achievements" className="text-white hover:text-evolve-purple transition-colors">
              Logros
            </Link>
            <Link to="/goals" className="text-white hover:text-evolve-purple transition-colors">
              Metas
            </Link>
            <Link to="/profile" className="text-white hover:text-evolve-purple transition-colors">
              Perfil
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-evolve-dark py-4 border-t border-evolve-gray/20">
          <nav className="flex flex-col space-y-4 px-4">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-3 text-white hover:text-evolve-purple transition-colors py-2"
              onClick={toggleMenu}
            >
              <BarChart2 size={20} />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/habits" 
              className="flex items-center gap-3 text-white hover:text-evolve-purple transition-colors py-2"
              onClick={toggleMenu}
            >
              <Target size={20} />
              <span>Hábitos</span>
            </Link>
            <Link 
              to="/achievements" 
              className="flex items-center gap-3 text-white hover:text-evolve-purple transition-colors py-2"
              onClick={toggleMenu}
            >
              <Award size={20} />
              <span>Logros</span>
            </Link>
            <Link 
              to="/goals" 
              className="flex items-center gap-3 text-white hover:text-evolve-purple transition-colors py-2"
              onClick={toggleMenu}
            >
              <Target size={20} />
              <span>Metas</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center gap-3 text-white hover:text-evolve-purple transition-colors py-2"
              onClick={toggleMenu}
            >
              <User size={20} />
              <span>Perfil</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
