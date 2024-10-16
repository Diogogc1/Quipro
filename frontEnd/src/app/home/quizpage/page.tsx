'use client';

import React, { useState } from 'react';
import QuizQuestion from '../../components/QuizQuestion';
import { quizData } from './data'; 

const QuizPage: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    // Pegue as questões diretamente do objeto quizData
    const questions = quizData.questions;

    return (
        <div>
            {currentQuestionIndex < questions.length ? (
                <QuizQuestion 
                    question={questions[currentQuestionIndex]} 
                    onNextQuestion={handleNextQuestion} 
                />
            ) : (
                <div className="text-center">
                    <h2>Parabéns! Você completou o quiz.</h2>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
