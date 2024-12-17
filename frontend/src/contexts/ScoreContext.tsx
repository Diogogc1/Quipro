// src/contexts/ScoreContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { parseCookies } from 'nookies';

interface ScoreContextType {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  incrementScore: (points:number) => void;
  resetScore: () => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};

interface ScoreProviderProps {
  children: ReactNode;
}

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
  const [score, setScore] = useState(0); // Inicializa com 0, mas vamos atualizar depois
  const [loading, setLoading] = useState(true);

  const cookies = parseCookies();
  const userId = cookies.idUser; // Recupera o ID do usuário armazenado nos cookies

  const incrementScore = (points:number) => {
    setScore((prevScore) => prevScore + points); // Incrementa a pontuação no estado local
  };

  const resetScore = () => {
    setScore(0); // remove a pontuação no estado local
  };

  // Carregar a pontuação do usuário ao montar o componente
  useEffect(() => {
    
    const fetchScore = async () => {
      try {
        const response = await fetch(`http://localhost:3001/usuario/${userId}/points`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar pontos do usuário.");
        }

        const data = await response.json();
        if (data && data.points !== undefined) {
          setScore(data.points); // Atualiza a pontuação do usuário
        }
      } catch (error) {
        console.error('Erro ao carregar a pontuação inicial:', error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    if (userId) {
      fetchScore();
    } else {
      setLoading(false); // Caso não haja usuário, ainda finaliza o carregamento
    }
  }, [userId]);

  if (loading) {
    return <div></div>;
  }

  return (
    <ScoreContext.Provider value={{ score, setScore, incrementScore, resetScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
