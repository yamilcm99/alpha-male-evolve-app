
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Clock, Plus, Save, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

type Reminder = {
  id: string;
  title: string;
  time: string;
  days: string[];
  message: string;
  enabled: boolean;
};

const weekdays = [
  { value: 'mon', label: 'Lun' },
  { value: 'tue', label: 'Mar' },
  { value: 'wed', label: 'Mié' },
  { value: 'thu', label: 'Jue' },
  { value: 'fri', label: 'Vie' },
  { value: 'sat', label: 'Sáb' },
  { value: 'sun', label: 'Dom' },
];

const ReminderPage = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id'>>({
    title: '',
    time: '08:00',
    days: ['mon', 'tue', 'wed', 'thu', 'fri'],
    message: '',
    enabled: true
  });

  useEffect(() => {
    const savedReminders = localStorage.getItem('reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  const saveReminders = (updatedReminders: Reminder[]) => {
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
    setReminders(updatedReminders);
  };

  const handleAddReminder = () => {
    if (!newReminder.title.trim()) {
      toast.error('Por favor ingresa un título para el recordatorio');
      return;
    }

    const reminder: Reminder = {
      id: crypto.randomUUID(),
      ...newReminder
    };

    const updatedReminders = [...reminders, reminder];
    saveReminders(updatedReminders);
    
    setNewReminder({
      title: '',
      time: '08:00',
      days: ['mon', 'tue', 'wed', 'thu', 'fri'],
      message: '',
      enabled: true
    });

    toast.success('Recordatorio creado exitosamente');
  };

  const handleDeleteReminder = (id: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    saveReminders(updatedReminders);
    toast.success('Recordatorio eliminado');
  };

  const handleToggleReminder = (id: string) => {
    const updatedReminders = reminders.map(reminder => {
      if (reminder.id === id) {
        return { ...reminder, enabled: !reminder.enabled };
      }
      return reminder;
    });
    saveReminders(updatedReminders);
  };

  const toggleDay = (day: string) => {
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
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Recordatorios</h1>
        <p className="text-gray-300">Configura recordatorios para mantener tu consistencia</p>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="bg-evolve-dark/50 mb-6">
          <TabsTrigger value="list">Mis Recordatorios</TabsTrigger>
          <TabsTrigger value="new">Nuevo Recordatorio</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="grid gap-4">
            {reminders.length > 0 ? (
              reminders.map(reminder => (
                <Card key={reminder.id} className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          reminder.enabled ? 'bg-evolve-purple/20 text-evolve-purple' : 'bg-gray-800 text-gray-500'
                        }`}>
                          <Clock size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium">{reminder.title}</h3>
                          <div className="flex gap-1 mt-1">
                            <span className="text-sm text-gray-400">{reminder.time}</span>
                            <span className="text-sm text-gray-500">|</span>
                            <span className="text-sm text-gray-400">
                              {reminder.days.map(day => {
                                const dayObj = weekdays.find(d => d.value === day);
                                return dayObj ? dayObj.label : day;
                              }).join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch 
                          checked={reminder.enabled} 
                          onCheckedChange={() => handleToggleReminder(reminder.id)} 
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteReminder(reminder.id)}
                        >
                          <Trash2 size={18} className="text-gray-400 hover:text-red-400" />
                        </Button>
                      </div>
                    </div>
                    {reminder.message && (
                      <p className="mt-3 text-sm text-gray-400 border-t border-gray-800 pt-3">
                        {reminder.message}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Clock size={40} className="text-gray-500 mb-3" />
                  <h3 className="text-lg font-medium mb-1">No hay recordatorios</h3>
                  <p className="text-gray-400 text-center">
                    Crea recordatorios para mantener tu consistencia en el desarrollo de hábitos
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="new">
          <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
            <CardHeader>
              <CardTitle>Crear Nuevo Recordatorio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  placeholder="Ej: Meditación matutina"
                  className="bg-evolve-dark/40 border-evolve-purple/30"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time">Hora</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                    className="bg-evolve-dark/40 border-evolve-purple/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Días</Label>
                  <div className="flex gap-1 flex-wrap">
                    {weekdays.map((day) => (
                      <Button
                        key={day.value}
                        type="button"
                        size="sm"
                        variant={newReminder.days.includes(day.value) ? "default" : "outline"}
                        onClick={() => toggleDay(day.value)}
                        className={newReminder.days.includes(day.value) ? "bg-evolve-purple hover:bg-evolve-purple/80" : ""}
                      >
                        {day.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje (opcional)</Label>
                <Input
                  id="message"
                  value={newReminder.message}
                  onChange={(e) => setNewReminder({ ...newReminder, message: e.target.value })}
                  placeholder="Mensaje que aparecerá en la notificación"
                  className="bg-evolve-dark/40 border-evolve-purple/30"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="enabled"
                  checked={newReminder.enabled}
                  onCheckedChange={(checked) => setNewReminder({ ...newReminder, enabled: checked })}
                />
                <Label htmlFor="enabled">Activar recordatorio</Label>
              </div>

              <Button 
                className="w-full mt-4 bg-evolve-purple hover:bg-evolve-purple/80"
                onClick={handleAddReminder}
              >
                <Plus size={16} className="mr-2" />
                Crear Recordatorio
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ReminderPage;
