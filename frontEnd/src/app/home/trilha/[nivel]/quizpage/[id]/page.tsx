'use client';

import React, { useEffect, useState } from 'react';
import QuizQuestion from '../../../../../components/QuizQuestion';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'phosphor-react';
import { useRouter } from 'next/navigation';
import { parseCookies } from "nookies"; //importando cookies
import { useScore } from '@/contexts/ScoreContext'; // Importando o contexto

interface QuizPageProps{
    params:{
        id:string;
    }
}


const QuizPage: React.FC<QuizPageProps> = ({params}) => {

    const {id} = params;  // Pega o parâmetro id da URL
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<any[]>([]); // Use 'any' ou defina um tipo adequado
    const [isLoading, setIsLoading] = useState(true); // Estado para carregar
    const { score, setScore, incrementScore } = useScore(); // Usando o contexto de Score

    const [currentQuizScore, setCurrentQuizScore] = useState(0);


    //recebendo id do usuario que esta armazenado no cookie
    const cookies = parseCookies();
    const userId = cookies.idUser;

    const router = useRouter();

    // // Função para buscar a pontuação do usuário
    // const fetchScore = async () => {
    //     if (userId){
    //         try {
    //         const response = await fetch(`http://localhost:3001/usuario/${userId}/points`, {
    //             method: 'GET',
    //             headers: {
    //             'Content-Type': 'application/json',
    //             },
    //         });

    //         const data = await response.json();
    //         if (data && data.score !== undefined) {
    //             setScore(data.score); // Atualiza a pontuação do usuário
    //         }
    //         } catch (error) {
    //         console.error('Erro ao carregar a pontuação:', error);
    //         }
    //     }
    //   };

    
    useEffect(() => {
       
        // Chama a função para buscar a pontuação assim que o componente for montado
        // fetchScore();

        const fetchQuestions = async () => {
            try{
                const id = Number(params.id); // Aqui converte 'id' para número
                const response = await fetch('http://localhost:3001/quizz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }), // Passa os parâmetros no corpo da requisição
                });


                const data = await response.json();
                
                setQuestions(data.quizzes || []); // Armazena a lista de quizzes no estado
            } catch(error){
                console.error('Erro ao carregar quizzes:', error);
            } finally {
                setIsLoading(false); // Finaliza o carregamento
            }
        };

        fetchQuestions();

    }, [id, userId]); // Dependências incluem 'id' e 'userId' para garantir que as mudanças sejam tratadas


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


    const handleNextQuestion = async () => {
        if (currentQuestionIndex + 1 === questions.length) {
            await updateUserPoints(Number(userId), score); // Atualiza pontuação ao finalizar
        }
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    //função para adicionar pontuação(atomos)
    const handleCorrectAnswer = () => {
        incrementScore(); // Usa a função do contexto para incrementar a pontuação
        setCurrentQuizScore((prev) => prev + 1); // Incrementa a pontuação do quiz atual
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
    }
    else if(questions.length === 0){
        return notFound();
    }

    return (
        <div className='h-full'>
            <button onClick={()=>router.back()} className="absolute top-24 flex gap-1 items-center sm:top-[7.5rem]">
                <ArrowLeft size={"1rem"} className="text-zinc-500" />
                <p className="text-zinc-500 text-sm leading-snug">Voltar</p>
            </button>
            {questions.length > 0 && currentQuestionIndex < questions.length ? (
                <QuizQuestion
                    question={questions[currentQuestionIndex]} // Passa a pergunta atual para o componente
                    onNextQuestion={handleNextQuestion}
                    onCorrectAnswer={handleCorrectAnswer}
                />
            ) : (
                <div className="text-center">
                    <h1>Parabéns! Você completou o quiz.</h1>
                    <p>Você acertou {currentQuizScore} questões de {questions.length} questões.</p>
                    <div className="flex items-center justify-center">
                        <h2>Você ganhou {currentQuizScore} átomos.</h2>
                        <img src="/assets/atomoIcon.svg" className="h-6" alt="" />
                    </div>
                </div>
                )
            }
        </div>
    );
};

export default QuizPage;
