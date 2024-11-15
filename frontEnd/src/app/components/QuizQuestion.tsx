import {CaretCircleRight } from 'phosphor-react';
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
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onNextQuestion }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    const handleCheckAnswer = () => {
        if (selectedOption) {
            setChecked(true);
            setFeedback(
                selectedOption === question.correctAnswer
                    ? `Correto! ${question.explanation}`
                    : `Incorreto. A resposta correta é: ${question.correctAnswer}. ${question.explanation}`
            );
        }
    };

    const handleNextQuestion = () => {
        setChecked(false); // Reseta para a próxima questão
        setSelectedOption(null); // Reseta a opção selecionada
        setFeedback(null); // Limpa o feedback
        onNextQuestion(); // Chama a função para a próxima questão
    };

    const letrasAlternativas = ["a", "b", "c", "d", "e", "f"];

    return (
        <div className="border border-zinc-700 min-h-[calc(100%-64px)] mb-16  w-full sm:w-9/12 md:w-9/12  lg:w-[31.625rem] text-zinc-300 flex flex-col items-center mx-auto p-8 bg-zinc-800 rounded-md">

            <h1 className="text-xl w-full font-bold mb-7 text-justify">{question.question}</h1>
            {question.image && <img src={question.image} alt="Imagem da questão" loading="lazy" className="mb-4 mx-auto w-full h-[200px] rounded-xl" />}

            <ul className="w-full py-2 mx-auto">
                {question.options.map((option, index) => (
                    <li
                        key={index}
                        className={`flex items-stretch gap-3 mb-2 border min-h-12 border-zinc-700 rounded-xl px-2 cursor-pointer ${selectedOption === option ? 'bg-violet-600 text-white' : ''}`}
                        onClick={() => !checked && setSelectedOption(option)} // Permite selecionar apenas antes de checar
                    >
                        <p className='border-r flex items-center justify-center w-9 border-zinc-700 font-bold text-xl '>{letrasAlternativas[index]}</p>
                        <span className='flex-1 self-center text-zinc-400' dangerouslySetInnerHTML={{ __html: option }}></span>
                    </li>
                ))}
            </ul>

            {feedback && (
                <div 
                    className={`mt-4 p-4 w-full mx-auto rounded-lg border-l-4 text-justify ${
                    selectedOption === question.correctAnswer
                        ? 'border-l-emerald-500 bg-emerald-50/10 text-emerald-400'
                        : 'border-l-red-500 bg-red-50/10 text-red-400'
                    } transition-all duration-300 ease-in-out shadow-lg`}
                >
                    <span dangerouslySetInnerHTML={{ __html: feedback }}></span>
                </div>
            )}

            <div className="mt-4 text-center">
                <button
                    onClick={checked ? handleNextQuestion : handleCheckAnswer}  // Alterna entre Responder ou Próxima
                    className={`px- h-10 rounded-2xl w-32 text-white cursor-pointer ${checked ? ' hover:bg-zinc-700 border ' : 'bg-violet-600 hover:bg-violet-500'}`}
                    disabled={!selectedOption}  // Desabilita até selecionar uma opção
                >
                    {checked ? (<div className=' flex items-center justify-between ml-5'>
                        <p>Próxima</p> 
                        <CaretCircleRight weight='fill' size={35} />
                    </div>) : 'Responder'}  {/* Alterna o texto */}
                </button>
            </div>
        </div>
    );
};

export default QuizQuestion;
