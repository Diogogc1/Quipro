'use client';
import React, { useEffect, useState } from 'react';
import QuizQuestion from '../../../../../components/QuizQuestion';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'phosphor-react';
import { useRouter } from 'next/navigation';

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

    const router = useRouter();

    useEffect(() => {
       
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

    }, [id]); // Dispara a busca apenas quando o ID está disponível

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
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
                />
            ) : questions.length === 0 ? (
                <div className="text-center">
                    <h2>Sem Conteúdo no momento.</h2>
                </div>
            ): (
                <div className="text-center">
                    <h2>Parabéns! Você completou o quiz.</h2>
                </div>
            )
            }
        </div>
    );
};

export default QuizPage;
