'use client';
import React, { useEffect, useState } from 'react';
import QuizQuestion from '../../../../components/QuizQuestion';

const QuizPage: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<any[]>([]); // Use 'any' ou defina um tipo adequado
    const [quizParams, setQuizParams] = useState<{ id: string; title: string } | null>(null);

    useEffect(() => {
        const params = sessionStorage.getItem('quizParams');
       
        if (params) {
            const parsedParams = JSON.parse(params);
            setQuizParams(parsedParams);

            const { id } = parsedParams;

            const fetchQuestions = async () => {
                const response = await fetch('http://localhost:3001/quizz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }), // Passa os parâmetros no corpo da requisição
                });


                const data = await response.json();
                
                setQuestions(data.quizzes); // Armazena a lista de quizzes no estado
            };

            fetchQuestions();
        }

        return () => {
            sessionStorage.removeItem('quizParams');
        };
    }, []); 

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    return (
        <div>
            {/* Exibe os parâmetros em um h1, se existirem */}
            {quizParams && (
                <h1>
                    ID: {quizParams.id}, Title: {quizParams.title}
                </h1>
            )}
            {questions && questions.length > 0 && currentQuestionIndex < questions.length ? (
                <QuizQuestion
                    question={questions[currentQuestionIndex]} // Passa a pergunta atual para o componente
                    onNextQuestion={handleNextQuestion}
                />
            ) : questions == null || questions.length == 0 ? (
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
