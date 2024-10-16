import React, { useState } from 'react';

interface Question {
    text: string;
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

    return (
        <div className="w-[600px] text-black flex flex-col mx-auto p-4 bg-white shadow-md rounded-md">
            <h1 className="text-xl  font-medium mb-3 text-center">{question.text}</h1>
            {question.image && <img src={question.image} alt="Imagem da questão" className="mb-4 mx-auto w-[350px] h-[200px]" />}

            <ul className="w-[90%] border-gray-300 p-2 mx-auto">
                {question.options.map((option, index) => (
                    <li
                        key={index}
                        className={`mb-2 border p-2 cursor-pointer ${selectedOption === option ? 'bg-gray-200' : ''}`}
                        onClick={() => !checked && setSelectedOption(option)} // Permite selecionar apenas antes de checar
                    >
                        <span dangerouslySetInnerHTML={{ __html: option }}></span>
                    </li>
                ))}
            </ul>

            {feedback && (
                <div className="mt-4 p-2 border w-[80%] mx-auto border-gray-300 rounded bg-gray-100">
                    <span dangerouslySetInnerHTML={{ __html: feedback }}></span>
                </div>
            )}

            <div className="mt-4 text-center">
                <button
                    onClick={checked ? handleNextQuestion : handleCheckAnswer}  // Alterna entre Responder ou Próxima
                    className={`px-4 py-2 rounded text-white ${checked ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}
                    disabled={!selectedOption}  // Desabilita até selecionar uma opção
                >
                    {checked ? 'Próxima' : 'Responder'}  {/* Alterna o texto */}
                </button>
            </div>
        </div>
    );
};

export default QuizQuestion;
