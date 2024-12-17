'use client';

import React, { useCallback, useEffect, useState } from 'react';
import QuizQuestion from '../../../../../components/QuizQuestion';
import { notFound } from 'next/navigation';
import { ArrowLeft, CircleNotch } from 'phosphor-react';
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie } from "nookies"; //importando cookies
import { useScore } from '@/contexts/ScoreContext'; // Importando o contexto
import Image from 'next/image';

interface QuizPageProps{
    params:{
        id:string;
    }
}

interface QuestionsProps{
    id: number,
    question: string,
    options: string[],
    correctAnswer: string,
    image: string | null,
    explanation: string,
    chapterId: number
}


const QuizPage: React.FC<QuizPageProps> = ({params}) => {

    // Pega o parâmetro id da URL
    const {id} = params; 
    //estados
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<QuestionsProps[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Estado para carregar
    const [currentQuizScore, setCurrentQuizScore] = useState(0);
    const [chapterAlreadyCompleted, setChapterAlreadyCompleted] = useState(false);
    const [maxChapters, setMaxChapters] = useState<number | null>(null);
    // chamando função do context Score, para incrementar pontuação
    const { incrementScore } = useScore();

    //recebendo id do usuario que esta armazenado no cookie
    const cookies = parseCookies();
    const userId = cookies.idUser;
    //instanciando router
    const router = useRouter();

    //função com requisição para salvar ultimo capitulo acessado pelo usuario
    const saveLastChapterAcessedId = useCallback(
        async ()=>{
            try {
                const response = await fetch('http://localhost:3001/usuario/save-last-chapter-accessed',{
                    method: 'PUT',
                    body: JSON.stringify({userId, id}),
                    headers: {'Content-Type': 'application/json'},
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao salvar ultimo acesso do usuário');
                }
    
                // Atualizar o cookie para garantir que ele está sincronizado
                setCookie(null, 'lastChapterAcessedId', id, { path: '/' });
            } catch (error) {
                console.error('Erro ao salvar ultimo acesso:', error);
            }
    
        }, [userId, id]
    );

    //função de requisição para numero total de capitulos da trilha
    const fetchMaxChapters = useCallback(
        async () => {
            const response = await fetch(`http://localhost:3001/capitulo/get-max-Chapters/${userId}/${id}`);
            if(response.ok)
            {
                const {totalChapters} = await response.json();
                setMaxChapters(totalChapters);
            }
            else{
                console.log("Erro ao buscar total de capitulos da trilha");
            }
        }, [userId, id]
    );

    //ativando função para salvar o ultimo capitulo acessado e requisição para receber lista de quizzes
    useEffect(() => {

        const fetchQuestions = async () => {
            try{
                const chapterId = Number(id); // Aqui converte 'id' para número
                const response = await fetch('http://localhost:3001/quizz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: chapterId }), // Passa os parâmetros no corpo da requisição
                });


                const data = await response.json();
                
                setQuestions(data.quizzes || []); // Armazena a lista de quizzes no estado
            } catch(error){
                console.error('Erro ao carregar quizzes:', error);
            } finally {
                setIsLoading(false); // Finaliza o carregamento
            }
        };

        saveLastChapterAcessedId();
        fetchQuestions();
        fetchMaxChapters();

    }, [saveLastChapterAcessedId, fetchMaxChapters, id]); // Dependências para garantir que as mudanças sejam tratadas


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

    //função para criar o progresso ou verificar se ele ja existe
    const progress = async ()=>{
        try {
            const response = await fetch('http://localhost:3001/progress/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId, id}),
            });

            const {result} = await response.json();

            return result;
        } catch (error) {
            console.error('Erro na criação de progress:', error);
        }
    }

    //função ativada quando os quizzes acabam (ao completar o capitulo)
    const handleNextQuestion = async () => {
        if (currentQuestionIndex + 1 === questions.length) {
            const result = await progress();
            if(result){ //indica que é a primeira vez realizando o capitulo
                incrementScore(currentQuizScore); //incrementa pontuação
                await updateUserPoints(Number(userId), currentQuizScore); // Atualiza pontuação ao finalizar
            }
            else{ //não ganha pontuação
                setChapterAlreadyCompleted(true); //indica que o capitulo já foi concluido
            }

        }
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    //função para adicionar pontuação(atomos)
    const handleCorrectAnswer = () => {
        setCurrentQuizScore((prev) => prev + 1); // Incrementa a pontuação do quiz atual
    };

    /* Barra de progresso de carregamento */
    if (isLoading) { //se estiver carregando
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="fixed top-0 left-0 w-full h-0.5 bg-zinc-800 z-50">
                    <div className="bg-violet-600 h-0.5 animate-progress w-full"></div>
                </div>
            </div>
        );
    }
    else if(questions.length === 0){ //se não tiver questões no capitulo
        return notFound();
    }

    //função para redirecionar para o proximo capitulo
    const handleNextChapter = () => {
        const currentUrl = window.location.pathname; // Obtém a URL atual
    
        const nextChapterId = (parseInt(id) + 1).toString(); // Calcula o próximo capítulo
        const newUrl = currentUrl.replace(`/quizpage/${id}`, `/quizpage/${nextChapterId}`); // Substitui o id na URL
    
        // Navega para a nova URL com o id atualizado
        router.push(newUrl);
    };

    //gera a pagina
    return (
        <div className='h-full'>
            <button onClick={()=>router.back()} className="absolute top-20 sm:top-[7.5rem] flex gap-1 items-center">
                <ArrowLeft size={"1rem"} className="text-zinc-500" />
                <p className="text-zinc-500 text-sm leading-snug">Voltar</p>
            </button>
            {/* Exibição dos quizzes */}
            {questions.length > 0 && currentQuestionIndex < questions.length ? (
                <QuizQuestion
                    question={questions[currentQuestionIndex]} // Passa a pergunta atual para o componente
                    onNextQuestion={handleNextQuestion}
                    onCorrectAnswer={handleCorrectAnswer}
                />
            ) : ( //Exibe quando finaliza os quizzes

                <div className="flex justify-center items-center h-full">
                    <div className="bg-zinc-800 rounded-lg p-6 w-full sm:w-[31.25rem] text-center">
                        <Image
                            height={241}
                            width={272}
                            src="/assets/images/pic_pontuacao.png"
                            alt="Pontuação"
                            unoptimized
                            className="mx-auto mb-6"
                        />
                        <div className='flex justify-center items-center mb-4'>
                            <Image height={24} width={24} src="/assets/atomoIcon.svg" alt="icone de um átomo" />
                            <h2 className="text-white text-2xl font-bold ml-2">{chapterAlreadyCompleted ? 0 : currentQuizScore} átomos</h2>
                        </div>
                        <p className="text-zinc-400">Você acertou {currentQuizScore} questões de {questions.length} questões.</p>

                        <div className="flex flex-col items-center gap-4 mt-6">
                            {maxChapters !== null && parseInt(id) < maxChapters &&(
                            <button
                                onClick={handleNextChapter}
                                className="bg-violet-600 h-[48px] text-white py-2 px-4 rounded-full hover:bg-violet-700"
                            >
                                Próximo capítulo
                            </button>
                            )}
                            
                            <button
                                onClick={()=>{window.location.reload()}} //recarrega a pagina
                                className="py-2 px-4 rounded-lg text-zinc-400 hover:bg-zinc-700 hover:text-white flex items-center gap-2"
                            >
                                <CircleNotch className="h-[24px] w-[24px]" alt="" />
                                Refazer
                            </button>
                        </div>
                    </div>
                </div>

                )
            }
        </div>
    );
};

export default QuizPage;
