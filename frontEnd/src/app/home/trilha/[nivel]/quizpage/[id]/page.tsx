"use client"
import React, { useEffect, useState } from 'react';
import QuizQuestion from '../../../../../components/QuizQuestion';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'phosphor-react';
import { useRouter } from 'next/navigation';
import { parseCookies } from "nookies";
import { useScore } from '@/contexts/ScoreContext';

interface QuizPageProps {
    params: {
        id: string;
    }
}

const QuizPage: React.FC<QuizPageProps> = ({ params }) => {
    const { id } = params;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { score, setScore, incrementScore } = useScore();
    const [currentQuizScore, setCurrentQuizScore] = useState(0);

    const cookies = parseCookies();
    const userId = cookies.idUser;

    const router = useRouter();

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
    }, [id, userId]);

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

    const handleNextQuestion = async () => {
        if (currentQuestionIndex + 1 === questions.length) {
            await updateUserPoints(Number(userId), score);
        }
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handleCorrectAnswer = () => {
        incrementScore();
        setCurrentQuizScore((prev) => prev + 1);
    };

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
        <div className='h-full'>
            <button onClick={() => router.back()} className="absolute top-24 flex gap-1 items-center sm:top-[7.5rem]">
                <ArrowLeft size="1rem" className="text-zinc-500" />
                <p className="text-zinc-500 text-sm leading-snug">Voltar</p>
            </button>
            {questions.length > 0 && currentQuestionIndex < questions.length ? (
                <QuizQuestion
                    question={questions[currentQuestionIndex]}
                    onNextQuestion={handleNextQuestion}
                    onCorrectAnswer={handleCorrectAnswer}
                />
            ) : (
                <div className="flex justify-center items-center h-full">
                    <div className="bg-zinc-800 rounded-lg p-6 w-[500px] text-center">
                        <img
                            src="/assets/images/pic_pontuacao.png"
                            alt="Pontuação"
                            className="mx-auto mb-6 h-[241px] w-[272px]"
                        />
                        <div className='flex justify-center items-center mb-4'>
                            <img src="/assets/atomoIcon.svg" className="h-6" alt="" />
                            <h2 className="text-white text-2xl font-bold ml-2">{currentQuizScore} átomos</h2>
                        </div>
                        <p className="text-zinc-400">Você acertou {currentQuizScore} questões de {questions.length} questões.</p>

                        <div className="flex flex-col items-center gap-4 mt-6">
                            <button
                                className="bg-violet-600 h-[48px] text-white py-2 px-4 rounded-full hover:bg-violet-700"
                            >
                                Próximo capítulo
                            </button>
                            <button
                                className="py-2 px-4 rounded-lg text-zinc-400 hover:bg-zinc-700 hover:text-white flex items-center gap-2"
                            >
                                <img src="/assets/images/reload_icon.png" className="h-[24px] w-[24px]" alt="" />
                                Refazer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
