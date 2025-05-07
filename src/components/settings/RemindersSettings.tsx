
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { Bell, Plus, Trash2, Clock } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Tipo para los recordatorios
type Reminder = {
  id: string;
  title: string;
  time: string;
  days: string[];
  enabled: boolean;
  category: string;
};

const daysOfWeek = [
  { value: 'mon', label: 'Lun' },
  { value: 'tue', label: 'Mar' },
  { value: 'wed', label: 'Mié' },
  { value: 'thu', label: 'Jue' },
  { value: 'fri', label: 'Vie' },
  { value: 'sat', label: 'Sáb' },
  { value: 'sun', label: 'Dom' },
];

const RemindersSettings = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState<Reminder>({
    id: '',
    title: '',
    time: '09:00',
    days: ['mon', 'tue', 'wed', 'thu', 'fri'],
    enabled: true,
    category: 'habits'
  });
  const [isAdding, setIsAdding] = useState(false);
  
  // Cargar recordatorios guardados
  useEffect(() => {
    const savedReminders = localStorage.getItem('reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);
  
  // Guardar recordatorios al cambiar
  useEffect(() => {
    if (reminders.length > 0) {
      localStorage.setItem('reminders', JSON.stringify(reminders));
    }
  }, [reminders]);
  
  const handleAddReminder = () => {
    setReminders([...reminders, { ...newReminder, id: uuidv4() }]);
    setNewReminder({
      id: '',
      title: '',
      time: '09:00',
      days: ['mon', 'tue', 'wed', 'thu', 'fri'],
      enabled: true,
      category: 'habits'
    });
    setIsAdding(false);
    toast.success('Recordatorio añadido con éxito');
  };
  
  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    toast.success('Recordatorio eliminado');
  };
  
  const handleToggleReminder = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ));
  };
  
  const handleDayToggle = (day: string) => {
    if (newReminder.days.includes(day)) {
      setNewReminder({
        ...newReminder,
        days: newReminder.days.filter(d => d !== day)
      });
    } else {
      setNewReminder({
        ...newReminder,
        days: [...newReminder.days, day]
      });
    }
  };
  
  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recordatorios</CardTitle>
        <Button 
          onClick={() => setIsAdding(!isAdding)} 
          size="sm"
          className="bg-evolve-purple hover:bg-evolve-purple/80"
        >
          {isAdding ? 'Cancelar' : 'Nuevo Recordatorio'}
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="mb-6 p-4 bg-evolve-dark/40 rounded-lg border border-evolve-purple/20">
            <h3 className="text-md font-medium mb-4">Nuevo recordatorio</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input 
                  id="title" 
                  value={newReminder.title} 
                  onChange={(e) => setNewReminder({...newReminder, title: e.target.value})} 
                  className="bg-evolve-dark/30 border-evolve-purple/30"
                  placeholder="Ej: Recordatorio de ejercicio"
                />
              </div>
              
              <div>
                <Label htmlFor="time">Hora</Label>
                <Input 
                  id="time" 
                  type="time" 
                  value={newReminder.time} 
                  onChange={(e) => setNewReminder({...newReminder, time: e.target.value})} 
                  className="bg-evolve-dark/30 border-evolve-purple/30"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select 
                  value={newReminder.category} 
                  onValueChange={(value) => setNewReminder({...newReminder, category: value})}
                >
                  <SelectTrigger id="category" className="bg-evolve-dark/30 border-evolve-purple/30">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="habits">Hábitos</SelectItem>
                    <SelectItem value="goals">Metas</SelectItem>
                    <SelectItem value="workout">Ejercicio</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Días</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {daysOfWeek.map((day) => (
                    <Button
                      key={day.value}
                      type="button"
                      size="sm"
                      variant={newReminder.days.includes(day.value) ? "default" : "outline"}
                      className={newReminder.days.includes(day.value) 
                        ? "bg-evolve-purple hover:bg-evolve-purple/80" 
                        : "hover:bg-evolve-dark/40"}
                      onClick={() => handleDayToggle(day.value)}
                    >
                      {day.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleAddReminder}
                className="w-full bg-evolve-purple hover:bg-evolve-purple/80"
                disabled={!newReminder.title || newReminder.days.length === 0}
              >
                <Plus size={16} className="mr-2" /> Añadir Recordatorio
              </Button>
            </div>
          </div>
        )}
        
        {reminders.length > 0 ? (
          <div className="space-y-3">
            {reminders.map(reminder => (
              <div
                key={reminder.id}
                className="flex items-center justify-between p-3 bg-evolve-dark/40 rounded-lg border border-evolve-gray/20"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    reminder.enabled ? 'bg-evolve-purple/20' : 'bg-gray-800'
                  }`}>
                    <Bell size={16} className={reminder.enabled ? 'text-evolve-purple' : 'text-gray-500'} />
                  </div>
                  <div>
                    <h4 className="font-medium">{reminder.title}</h4>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <Clock size={12} className="mr-1" />
                      <span>{reminder.time}</span>
                      <span className="mx-1">•</span>
                      <span>{reminder.days.map(d => 
                        daysOfWeek.find(day => day.value === d)?.label
                      ).join(', ')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={reminder.enabled} 
                    onCheckedChange={() => handleToggleReminder(reminder.id)}
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <Bell size={24} className="mx-auto mb-2 opacity-50" />
            <p>No tienes recordatorios configurados</p>
            <p className="text-sm mt-1">Crea recordatorios para mantener tus hábitos diarios</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RemindersSettings;
