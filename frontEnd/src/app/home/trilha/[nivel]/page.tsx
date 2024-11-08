"use client";

import { notFound, useRouter } from "next/navigation";
import Trail from "@/app/components/Trail";
import { useEffect, useState } from "react";
import Chapter from "@/app/components/Chapter";

const niveisPermitidos = ["iniciante", "intermediaria", "avancada"] as const;

interface TrilhaProps
{
    params: {
        nivel: string;
    };
}

interface Chapter {
    id: number;
    title: string;
    complete: boolean;
}


export default function Trilha({params}:TrilhaProps)
{
    // recebendo o parametro da url, indicando de qual trilha se trata
    const {nivel} = params;

    // Verifica se `nivel` é válido antes de continuar
    if (!niveisPermitidos.includes(nivel as typeof niveisPermitidos[number])) {
        return notFound();
    }

    //processo para buscar conteudo da trilha no banco de dados
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchChapters = async () => {
          const response = await fetch('http://localhost:3001/trilha/capitulos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: nivel }),
          });
    
          const data = await response.json();
          setChapters(data.chapters);
        };
    
        fetchChapters();
    }, [nivel]);


     // Armazena os parâmetros no sessionStorage e encaminha para pagina do quiz
    const handleChapterClick = (id) => {
    router.push(`/home/trilha/${nivel}/quizpage/${id}`);
    };

    //gerar pagina
    return(
        <>
            <Trail title={nivel} capitulos={chapters} onChapterClick={handleChapterClick} />
        </>
    )
}