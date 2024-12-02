'use client';
import React, { useState, useEffect } from 'react';
import QuizQuestion from '../../../../../components/QuizQuestion';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'phosphor-react';
import { useRouter } from 'next/navigation';

interface QuizPageProps {
    params: {
        id: string;
    };
}

const QuizPage: React.FC<QuizPageProps> = ({ params }) => {
    const { id } = params;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [score, setScore] = useState(0);
    const router = useRouter();

    // Função para atualizar pontuação no backend
    const updateUserPoints = async (userId: number, points: number) => {
        try {
            const response = await fetch('http://localhost:3001/usuario/update-user-points', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, points }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar pontuação do usuário');
            }
            console.log('Pontuação atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar a pontuação:', error);
        }
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const id = Number(params.id);
                const response = await fetch('http://localhost:3001/quizz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });

                const data = await response.json();
                setQuestions(data.quizzes || []);
            } catch (error) {
                console.error('Erro ao carregar quizzes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [id]);

    const handleNextQuestion = async () => {
        if (currentQuestionIndex + 1 === questions.length) {
            const userId = 1; // Substitua pelo ID real do usuário autenticado
            await updateUserPoints(userId, score); // Atualiza pontuação ao finalizar
        }
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handleCorrectAnswer = () => {
        setScore((prevScore) => prevScore + 1);
    };

    /* Barra de progresso */
    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="fixed top-0 left-0 w-full h-0.5 bg-zinc-800 z-50">
                    <div className="bg-violet-600 h-0.5 animate-progress w-full"></div>
                </div>
            </div>
        );
    } else if (questions.length === 0) {
        return notFound();
    }

    return (
        <div className="h-full">
            <button onClick={() => router.back()} className="absolute top-24 flex gap-1 items-center sm:top-[7.5rem]">
                <ArrowLeft size={"1rem"} className="text-zinc-500" />
                <p className="text-zinc-500 text-sm leading-snug">Voltar</p>
            </button>
            {questions.length > 0 && currentQuestionIndex < questions.length ? (
                <QuizQuestion
                    question={questions[currentQuestionIndex]}
                    onNextQuestion={handleNextQuestion}
                    onCorrectAnswer={handleCorrectAnswer}
                />
            ) : currentQuestionIndex >= questions.length ? (
                <div className="text-center">
                    <h1>Parabéns! Você completou o quiz.</h1>
                    <p>Você acertou {score} questões de {questions.length} questões.</p>
                    <div className="flex items-center justify-center">
                        <h2>Você ganhou {score} átomos.</h2>
                        <img src="/assets/atomoIcon.svg" className="h-6" alt="" />
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h2>Sem Conteúdo no momento.</h2>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
