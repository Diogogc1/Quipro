// frontEnd/src/components/ChapterList.tsx

import React from 'react';
import { ArrowsIn, Lock } from "phosphor-react";

interface Chapter {
    id: number;
    title: string;
    completed: boolean;
}

interface ChapterListProps {
    chapters: Chapter[];
    name: string;
    onChapterClick: (id: number, title: string) => void; // Nova prop para clique no capítulo
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters, name, onChapterClick }) => {
    return (
        <div className="w-[1000px] bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl text-white mb-4">Trilha: {name}</h2>
            <p className="text-gray-400 mb-6">Continue de onde parou</p>
            <ul className="space-y-4">
                {chapters.map((chapter, index) => (
                    <li
                        key={chapter.id}
                        className={`flex items-center p-4 rounded-lg ${chapter.completed ? 'border-2 border-green-400' : 'bg-gray-800'
                            } ${index === 0 ? 'border-2 border-green-400' : ''}`}
                        onClick={() => onChapterClick(chapter.id, chapter.title)} // Chama a função ao clicar
                    >
                        <div className="mr-4 text-white">
                            {chapter.completed ? (
                                <Lock className="w-6 h-6 text-lime-400" />
                            ) : (
                                <ArrowsIn className="w-6 h-6 text-lime-400" />
                            )}
                        </div>
                        <span className="text-lg text-white">{chapter.title}</span>
                    </li>
                ))}
            </ul>
            <a href="#" className="text-purple-400 text-sm mt-6 inline-block">Ver tudo</a>
        </div>
    );
};

export default ChapterList;
