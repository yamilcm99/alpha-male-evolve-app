
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-evolve-dark to-black text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-evolve-purple mb-4">404</h1>
        <p className="text-2xl mb-8">Página no encontrada</p>
        <Button asChild>
          <Link to="/" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
