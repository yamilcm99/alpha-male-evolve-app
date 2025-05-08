
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Share, MessageSquare, Users, Trophy, Star } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Mock data for community features
const mockPosts = [
  {
    id: '1',
    user: {
      name: 'Carlos Mendez',
      avatar: '',
      level: 5,
    },
    content: 'Acabo de completar mi primer ciclo de 21 días de meditación. ¡La constancia es clave!',
    likes: 24,
    comments: 8,
    tags: ['Meditación', 'Constancia', 'Hábitos'],
    time: '2 horas atrás'
  },
  {
    id: '2',
    user: {
      name: 'Ana García',
      avatar: '',
      level: 8,
    },
    content: 'Compartiendo mi progreso del mes: 15 días de gimnasio, 10 libros leídos y una reducción significativa en mi consumo de alcohol. ¡El camino Alpha está dando resultados!',
    likes: 56,
    comments: 12,
    tags: ['Progreso', 'Fitness', 'Lectura'],
    time: '5 horas atrás'
  },
  {
    id: '3',
    user: {
      name: 'Miguel Torres',
      avatar: '',
      level: 3,
    },
    content: '¿Alguien tiene recomendaciones de libros para mejorar habilidades de comunicación? Estoy trabajando en este aspecto de mi vida.',
    likes: 17,
    comments: 23,
    tags: ['Comunicación', 'Libros', 'Ayuda'],
    time: '1 día atrás'
  }
];

const mockChallenges = [
  {
    id: '1',
    title: 'Desafío de lectura: 30 días',
    description: 'Lee al menos 20 páginas diarias durante 30 días consecutivos.',
    participants: 128,
    daysLeft: 12,
    progress: 60,
    category: 'reading'
  },
  {
    id: '2',
    title: 'Desafío de abstinencia digital',
    description: 'Reduce el uso de redes sociales a un máximo de 30 minutos diarios.',
    participants: 78,
    daysLeft: 20,
    progress: 33,
    category: 'abstinence'
  },
  {
    id: '3',
    title: 'Desafío fitness: 100 pushups',
    description: 'Incrementa gradualmente hasta llegar a 100 pushups diarias en 30 días.',
    participants: 156,
    daysLeft: 5,
    progress: 85,
    category: 'fitness'
  }
];

const mockLeaderboard = [
  { name: 'Roberto Silva', level: 12, score: 1250, position: 1 },
  { name: 'Alejandra Rojas', level: 10, score: 980, position: 2 },
  { name: 'Daniel Martinez', level: 9, score: 870, position: 3 },
  { name: 'Carmen Fuentes', level: 8, score: 820, position: 4 },
  { name: 'Luis Moreno', level: 7, score: 790, position: 5 }
];

const CommunityPage = () => {
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    if (postContent.trim()) {
      toast.success('Publicación compartida con la comunidad');
      setPostContent('');
    } else {
      toast.error('Por favor escribe algo para publicar');
    }
  };

  const handleJoinChallenge = (id: string) => {
    toast.success('Te has unido al desafío');
  };

  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Comunidad Alpha</h1>
        <p className="text-gray-300">Conecta con otros hombres en el camino de la evolución</p>
      </div>
      
      <Tabs defaultValue="feed">
        <TabsList className="bg-evolve-dark/50 mb-6">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="challenges">Desafíos</TabsTrigger>
          <TabsTrigger value="leaderboard">Tabla de Líderes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed">
          <div className="grid gap-6">
            <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-3 items-start">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-evolve-purple/20 text-evolve-purple">
                      TU
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder="Comparte tu progreso o pregunta a la comunidad..."
                      className="bg-evolve-dark/40 border-evolve-purple/30"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    />
                    <div className="flex justify-end mt-3">
                      <Button 
                        onClick={handlePost} 
                        className="bg-evolve-purple hover:bg-evolve-purple/80"
                      >
                        Publicar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {mockPosts.map(post => (
              <Card key={post.id} className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
                <CardContent className="pt-6">
                  <div className="flex gap-3 items-start">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.user.avatar} alt={post.user.name} />
                      <AvatarFallback className="bg-evolve-purple/20 text-evolve-purple">
                        {post.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{post.user.name}</h3>
                          <p className="text-xs text-gray-400">
                            Nivel {post.user.level} • {post.time}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p>{post.content}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="border-evolve-purple/50 text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t border-gray-800 flex justify-between py-3">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Star size={16} className="mr-1" /> {post.likes}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <MessageSquare size={16} className="mr-1" /> {post.comments}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Share size={16} className="mr-1" /> Compartir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="challenges">
          <div className="grid gap-6 md:grid-cols-2">
            {mockChallenges.map(challenge => (
              <Card key={challenge.id} className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{challenge.title}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={
                        challenge.category === 'fitness' ? 'border-blue-500 text-blue-400' :
                        challenge.category === 'reading' ? 'border-amber-500 text-amber-400' :
                        'border-red-500 text-red-400'
                      }
                    >
                      {challenge.category === 'fitness' ? 'Fitness' : 
                      challenge.category === 'reading' ? 'Lectura' : 'Abstinencia'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-300 mb-4">{challenge.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Progreso global</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{challenge.participants} participantes</span>
                    <span>{challenge.daysLeft} días restantes</span>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full bg-evolve-purple hover:bg-evolve-purple/80"
                    onClick={() => handleJoinChallenge(challenge.id)}
                  >
                    Unirse al desafío
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="leaderboard">
          <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy size={20} className="text-amber-500 mr-2" />
                Tabla de Líderes - Top Alphas
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {mockLeaderboard.map((user, index) => (
                  <div 
                    key={user.name} 
                    className={`flex items-center p-3 rounded-lg ${
                      index === 0 ? 'bg-amber-900/20 border border-amber-700/50' :
                      index === 1 ? 'bg-slate-500/20 border border-slate-400/50' :
                      index === 2 ? 'bg-amber-800/20 border border-amber-500/50' :
                      'bg-evolve-dark/40 border border-evolve-gray/20'
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center font-bold mr-3">
                      {user.position}
                    </div>
                    
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback className="bg-evolve-purple/20 text-evolve-purple">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{user.name}</h4>
                        <span className="font-bold text-evolve-purple">{user.score} pts</span>
                      </div>
                      <p className="text-xs text-gray-400">Nivel {user.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default CommunityPage;
