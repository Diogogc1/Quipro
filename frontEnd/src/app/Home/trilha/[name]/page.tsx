"use client";
import ChapterList from '@/app/components/ChapterList';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';



const TrilhaPage = ({ params }: { params: { name: string } }) => {
  const [chapters, setChapters] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchChapters = async () => {
      const response = await fetch('http://localhost:3001/trilha/capitulos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: params.name }),
      });

      const data = await response.json();
      setChapters(data.chapters);
    };

    fetchChapters();
  }, [params.name]);

  const handleChapterClick = (id, title) => {
    // Armazena os parâmetros no sessionStorage
    sessionStorage.setItem('quizParams', JSON.stringify({ id, title }));
    router.push(`/home/trilha/${params.name}/quizpage`);
  };


  return (
    <div className="p-8">
      <ChapterList chapters={chapters} name={params.name} onChapterClick={handleChapterClick} />
    </div>
  );
};

export default TrilhaPage;
