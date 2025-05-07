
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/sonner';

const AppSettings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [graphType, setGraphType] = useState('bar');
  
  const handleSaveSettings = () => {
    // Aquí se guardarían los ajustes en localStorage o una base de datos
    localStorage.setItem('appSettings', JSON.stringify({
      darkMode,
      notifications,
      sounds,
      graphType
    }));
    
    toast.success('Configuración guardada con éxito');
  };
  
  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardHeader>
        <CardTitle>Configuración General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-md font-medium">Apariencia</h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="flex items-center space-x-2 cursor-pointer">
              <span>Modo oscuro</span>
            </Label>
            <Switch 
              id="dark-mode" 
              checked={darkMode} 
              onCheckedChange={setDarkMode} 
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-md font-medium">Notificaciones</h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-notifications" className="flex items-center space-x-2 cursor-pointer">
              <span>Habilitar notificaciones</span>
            </Label>
            <Switch 
              id="enable-notifications" 
              checked={notifications} 
              onCheckedChange={setNotifications} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-sounds" className="flex items-center space-x-2 cursor-pointer">
              <span>Sonidos</span>
            </Label>
            <Switch 
              id="enable-sounds" 
              checked={sounds} 
              onCheckedChange={setSounds} 
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-md font-medium">Visualización de datos</h3>
          
          <RadioGroup value={graphType} onValueChange={setGraphType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bar" id="bar" />
              <Label htmlFor="bar">Gráficas de barras (predeterminado)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="line" id="line" />
              <Label htmlFor="line">Gráficas de líneas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pie" id="pie" />
              <Label htmlFor="pie">Gráficas circulares</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="pt-4 border-t border-evolve-purple/20">
          <Button 
            onClick={handleSaveSettings}
            className="bg-evolve-purple hover:bg-evolve-purple/80"
          >
            Guardar configuración
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppSettings;
