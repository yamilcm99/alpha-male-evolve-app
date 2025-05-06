
import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useHabits } from '@/context/HabitsContext';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AICoachPage = () => {
  const { userProfile } = useUser();
  const { habits } = useHabits();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with a welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: `ai-${Date.now()}`,
      content: `¡Hola${userProfile?.name ? ` ${userProfile.name}` : ''}! Soy tu coach personal de AlphaEvolve. Estoy aquí para ayudarte con tus hábitos y metas. Puedes preguntarme cómo mejorar tus rutinas, superar obstáculos o mantener tu motivación. ¿En qué puedo ayudarte hoy?`,
      sender: 'ai' as const,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, [userProfile?.name]);

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Simulated AI response
      // In a real implementation, this would be a call to an AI service
      await simulateAIResponse(input);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error('No se pudo conectar con el coach de IA. Inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to simulate AI response
  // This would be replaced with a real AI API call
  const simulateAIResponse = async (userInput: string) => {
    // Create context from user profile and habits
    const context = prepareUserContext();
    
    // Wait a bit to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate response based on user input and context
    const response = generateAIResponse(userInput.toLowerCase(), context);
    
    const aiMessage = {
      id: `ai-${Date.now()}`,
      content: response,
      sender: 'ai' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };

  // Prepare context data from user profile and habits
  const prepareUserContext = () => {
    return {
      name: userProfile?.name || '',
      age: userProfile?.age || 0,
      physicalCondition: userProfile?.physicalCondition || '',
      habits: habits.map(h => ({
        name: h.name,
        streak: h.streak,
        category: h.category
      }))
    };
  };

  // Generate appropriate response based on user input and context
  // This would be replaced with actual AI API call
  const generateAIResponse = (input: string, context: any) => {
    // Example pattern matching for different types of questions
    if (input.includes('motivación') || input.includes('motivado')) {
      return `La motivación es pasajera, pero la disciplina es constante. Para mantener tu motivación, enfócate en tus "porqués" profundos – las razones fundamentales por las que quieres cambiar. Además, te recomiendo dividir tus metas en pasos más pequeños y celebrar cada logro, incluso los menores. Recuerda que estás en un proceso de 21 días para crear hábitos duraderos, ¡y cada día cuenta!`;
    } 
    else if (input.includes('procrastina') || input.includes('postergar')) {
      return `La procrastinación es un patrón que podemos romper. Prueba la técnica Pomodoro: trabaja enfocado por 25 minutos y descansa 5. También te sugiero identificar la "primera acción mínima" para cualquier tarea – algo tan pequeño que no puedas negarte a hacerlo. Por ejemplo, si debes hacer ejercicio, comprométete solo a ponerte los tenis y salir por la puerta. El resto vendrá naturalmente.`;
    }
    else if (input.includes('ejercicio') || input.includes('entrena')) {
      const fitnessHabit = context.habits.find((h: any) => h.category === 'fitness');
      if (fitnessHabit) {
        return `Veo que ya estás trabajando en "${fitnessHabit.name}" y llevas una racha de ${fitnessHabit.streak} días. ¡Excelente! Para seguir mejorando, considera incrementar gradualmente la intensidad cada 7 días. Recuerda que la consistencia es más importante que la intensidad inicial. ¿Hay algún aspecto específico del entrenamiento con el que necesites ayuda?`;
      } else {
        return `El ejercicio consistente es fundamental para el desarrollo masculino óptimo. Te recomiendo comenzar con 20-30 minutos diarios de actividad física, alternando entre entrenamiento de fuerza y cardio. Lo importante no es la perfección sino la consistencia. ¿Te gustaría que te ayude a crear un plan de ejercicios básico para empezar?`;
      }
    }
    else if (input.includes('hola') || input.includes('saludos') || input.includes('buenas')) {
      return `¡Hola! Estoy aquí para ayudarte con cualquier aspecto de tu desarrollo personal. Puedes preguntarme sobre estrategias para mantener hábitos, superar obstáculos o mejorar en áreas específicas. ¿En qué puedo ayudarte hoy?`;
    } 
    else {
      return `Gracias por compartir eso. Como tu coach personal, estoy aquí para apoyarte en tu camino de desarrollo. Recuerda que el cambio verdadero viene de acciones pequeñas pero consistentes. ¿Hay algún área específica en la que quieras profundizar o algún obstáculo particular que estés enfrentando?`;
    }
  };

  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Coach Personal IA</h1>
        <p className="text-gray-300">Conversa con tu coach personal impulsado por inteligencia artificial</p>
      </div>

      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot size={20} className="text-evolve-purple" />
            <span>Alpha Coach</span>
            <Badge variant="outline" className="ml-2 bg-evolve-purple/20 text-xs font-normal">
              <Sparkles size={12} className="mr-1" /> IA
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] overflow-y-auto mb-4 pr-2">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-evolve-purple text-white rounded-tr-none' 
                        : 'bg-evolve-dark/90 border border-evolve-gray/30 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'ai' ? (
                        <>
                          <Bot size={16} className="text-evolve-purple" />
                          <span className="text-xs font-medium text-evolve-purple">Alpha Coach</span>
                        </>
                      ) : (
                        <>
                          <User size={16} className="text-white/70" />
                          <span className="text-xs font-medium text-white/70">Tú</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className="text-right mt-1">
                      <span className="text-xs opacity-60">
                        {new Intl.DateTimeFormat('es', {
                          hour: '2-digit',
                          minute: '2-digit'
                        }).format(message.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-evolve-dark/50 border border-evolve-gray/30 rounded-lg px-4 py-2 text-white"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              className="bg-evolve-purple hover:bg-evolve-purple/80"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                <Send size={18} />
              )}
            </Button>
          </div>
          
          <div className="mt-4 text-xs text-center text-gray-400">
            <p>Este coach IA está en fase beta. Para obtener mejores resultados, sé específico en tus preguntas.</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <SuggestionButton 
          onClick={() => setInput('¿Cómo puedo mantenerme motivado para continuar con mis hábitos?')}
          disabled={isLoading}
        >
          ¿Cómo mantener la motivación?
        </SuggestionButton>
        <SuggestionButton 
          onClick={() => setInput('Tengo problemas para dejar de procrastinar. ¿Qué técnicas me recomiendas?')}
          disabled={isLoading}
        >
          Superar la procrastinación
        </SuggestionButton>
        <SuggestionButton 
          onClick={() => setInput('¿Qué ejercicios me recomiendas para empezar a entrenar?')}
          disabled={isLoading}
        >
          Consejos de entrenamiento
        </SuggestionButton>
      </div>
    </PageLayout>
  );
};

// Helper component for suggestion buttons
const SuggestionButton = ({ children, onClick, disabled }: { 
  children: React.ReactNode; 
  onClick: () => void;
  disabled: boolean;
}) => (
  <Button 
    variant="outline" 
    className="border-evolve-gray/30 hover:bg-evolve-dark/50 text-sm justify-start"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </Button>
);

// Type declaration for the Badge component which might not be imported
const Badge = ({ children, className, variant }: { 
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}) => (
  <span className={`px-2 py-0.5 rounded-full text-xs inline-flex items-center ${className}`}>
    {children}
  </span>
);

export default AICoachPage;
