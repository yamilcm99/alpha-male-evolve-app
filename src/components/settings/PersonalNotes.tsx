
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from '@/components/ui/sonner';
import { FileText, Plus, Edit, Trash2, Search } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Tipo para las notas
type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
};

const PersonalNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estado para el diálogo de nota nueva/edición
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note>({
    id: '',
    title: '',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: []
  });
  const [isEditing, setIsEditing] = useState(false);
  
  // Cargar notas guardadas
  useEffect(() => {
    const savedNotes = localStorage.getItem('personalNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);
  
  // Guardar notas al cambiar
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('personalNotes', JSON.stringify(notes));
    }
  }, [notes]);
  
  const handleAddNote = () => {
    const now = new Date();
    const newNote = {
      ...currentNote,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now
    };
    
    setNotes([...notes, newNote]);
    resetForm();
    setIsDialogOpen(false);
    toast.success('Nota creada con éxito');
  };
  
  const handleUpdateNote = () => {
    const now = new Date();
    setNotes(notes.map(note => 
      note.id === currentNote.id 
        ? { ...currentNote, updatedAt: now } 
        : note
    ));
    resetForm();
    setIsDialogOpen(false);
    toast.success('Nota actualizada');
  };
  
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast.success('Nota eliminada');
  };
  
  const openEditDialog = (note: Note) => {
    setCurrentNote(note);
    setIsEditing(true);
    setIsDialogOpen(true);
  };
  
  const openNewNoteDialog = () => {
    resetForm();
    setIsEditing(false);
    setIsDialogOpen(true);
  };
  
  const resetForm = () => {
    setCurrentNote({
      id: '',
      title: '',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: []
    });
  };
  
  // Filtrar notas por búsqueda
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  
  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Notas Personales</CardTitle>
        <Button 
          onClick={openNewNoteDialog} 
          size="sm"
          className="bg-evolve-purple hover:bg-evolve-purple/80"
        >
          Nueva Nota
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Buscar notas..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-evolve-dark/30 border-evolve-purple/30"
            />
          </div>
        </div>
        
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotes.map(note => (
              <div
                key={note.id}
                className="p-4 bg-evolve-dark/40 rounded-lg border border-evolve-gray/20"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg flex items-center">
                    <FileText size={16} className="mr-2 text-evolve-purple" />
                    {note.title}
                  </h3>
                  <div className="flex space-x-1">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => openEditDialog(note)}
                      className="h-8 w-8"
                    >
                      <Edit size={15} />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleDeleteNote(note.id)}
                      className="h-8 w-8 text-red-400"
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-2 text-gray-300 line-clamp-3 text-sm">
                  {note.content}
                </div>
                
                {note.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {note.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 text-xs bg-evolve-purple/20 text-evolve-purple/90 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="mt-2 text-xs text-gray-400">
                  Actualizada: {format(new Date(note.updatedAt), "d 'de' MMM, yyyy HH:mm", { locale: es })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            <FileText size={24} className="mx-auto mb-2 opacity-50" />
            <p>{searchQuery ? 'No se encontraron notas que coincidan con la búsqueda' : 'No tienes notas creadas'}</p>
            <p className="text-sm mt-1">Crea notas para guardar ideas, seguimiento o reflexiones</p>
          </div>
        )}
      </CardContent>
      
      {/* Diálogo para crear/editar notas */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-evolve-dark text-white border-evolve-purple/30">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Nota' : 'Nueva Nota'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Input 
                placeholder="Título" 
                value={currentNote.title}
                onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                className="bg-evolve-dark/50 border-evolve-purple/30"
              />
            </div>
            
            <div>
              <Textarea 
                placeholder="Contenido de la nota" 
                rows={6}
                value={currentNote.content}
                onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
                className="bg-evolve-dark/50 border-evolve-purple/30"
              />
            </div>
            
            <div>
              <Input 
                placeholder="Etiquetas (separadas por comas)" 
                value={currentNote.tags.join(', ')}
                onChange={(e) => setCurrentNote({
                  ...currentNote, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                })}
                className="bg-evolve-dark/50 border-evolve-purple/30"
              />
              <p className="text-xs text-gray-400 mt-1">
                Ej: fitness, meta, idea, importante
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-evolve-purple hover:bg-evolve-purple/80"
              disabled={!currentNote.title.trim()}
              onClick={isEditing ? handleUpdateNote : handleAddNote}
            >
              {isEditing ? 'Guardar cambios' : 'Crear nota'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PersonalNotes;
