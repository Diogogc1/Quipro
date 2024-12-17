import Image from 'next/image';
import {ArrowRight } from 'phosphor-react';
import React, { useState } from 'react';

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    image?: string | null | undefined;
}

interface QuizQuestionProps {
    question: Question;
    onNextQuestion: () => void;
    onCorrectAnswer: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onNextQuestion, onCorrectAnswer }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const lettersAlternatives = ["a", "b", "c", "d", "e", "f"];

    const handleCheckAnswer = () => {
        if (selectedOption) {
            setChecked(true);
            if (selectedOption === question.correctAnswer) {
                setFeedback(`Correto! ${question.explanation}`);
                onCorrectAnswer(); // Incrementa a pontuação
            } else {
                setFeedback(`Incorreto. A resposta correta é: ${question.correctAnswer}. ${question.explanation}`);
            }
        }
    };

    const handleNextQuestion = () => {
        setChecked(false); // Reseta para a próxima questão
        setSelectedOption(null); // Reseta a opção selecionada
        setFeedback(null); // Limpa o feedback
        onNextQuestion(); // Chama a função para a próxima questão
    };


    return (
        <div className="border border-zinc-700 min-h-[calc(100vh-(5rem+2.5rem))]  w-full sm:w-9/12 md:w-9/12  lg:w-[31.625rem] text-zinc-300 flex flex-col items-center mx-auto py-8 px-3 sm:p-8 bg-zinc-800 rounded-md">

            <h1 className="text-xl w-full font-bold mb-7 text-justify">{question.question}</h1>
            {question.image && <div className='relative h-[200px] w-full mb-4 mx-auto'><Image src={question.image} alt="Imagem da questão" loading="lazy" fill className=" rounded-xl object-cover" /></div>}

            <ul className="w-full py-2 mx-auto">
                {question.options.map((option, index) => (
                    <li
                        key={index}
                        className={`flex items-stretch gap-3 mb-2 border min-h-12 border-zinc-700 rounded-xl px-2 cursor-pointer ${selectedOption === option ? 'bg-violet-600 text-white' : ''}`}
                        onClick={() => !checked && setSelectedOption(option)} // Permite selecionar apenas antes de checar
                    >
                        <p className='border-r flex items-center justify-center w-9 border-zinc-700 font-bold text-xl '>{lettersAlternatives[index]}</p>
                        <span className='flex-1 self-center text-zinc-400' dangerouslySetInnerHTML={{ __html: option }}></span>
                    </li>
                ))}
            </ul>

            {feedback && (
                <div 
                    className={`mt-4 p-4 w-full mx-auto rounded-lg border-l-4 text-justify bg-zinc-700 ${
                    selectedOption === question.correctAnswer
                        ? 'border-green-500 text-green-500'
                        : 'border-l-red-500 text-red-500'
                    } transition-all duration-300 ease-in-out shadow-lg`}
                >
                    <span dangerouslySetInnerHTML={{ __html: feedback }}></span>
                </div>
            )}

            <div className="mt-4 text-center font-bold">
                <button
                    onClick={checked ? handleNextQuestion : handleCheckAnswer}  // Alterna entre Responder ou Próxima
                    className={`px- h-12 rounded-full w-[8.375rem] text-white cursor-pointer ${checked ? 'w-[9.4375rem] border-lime-400 hover:bg-zinc-700 border ' : 'bg-violet-600 hover:bg-violet-500'}`}
                    disabled={!selectedOption}  // Desabilita até selecionar uma opção
                >
                    {checked ? (<div className='flex items-center justify-center gap-[0.625rem]'>
                        <p className='font-normal'>Próxima</p> 
                        <ArrowRight size={35} />
                    </div>) : 'Responder'}  {/* Alterna o texto */}
                </button>
            </div>
        </div>
    );
};

export default QuizQuestion;
