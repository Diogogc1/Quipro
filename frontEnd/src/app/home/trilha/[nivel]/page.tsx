"use client";

import { notFound, useRouter } from "next/navigation";
import Trail from "@/app/components/Trail";
import { useEffect, useState } from "react";
import Chapter from "@/app/components/Chapter";
import { parseCookies } from "nookies";

const permittedTrails = ["Iniciante", "Intermediario", "Avancado"] as const;

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

     //recebendo id do usuario que esta armazenado no cookie
     const cookies = parseCookies();
     const userId = cookies.idUser;
 

    // Verifica se `nivel` é válido antes de continuar
    if (!permittedTrails.includes(nivel as typeof permittedTrails[number])) {
        return notFound();
    }

    //processo para buscar conteudo da trilha no banco de dados
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const router = useRouter();

    //requisição para buscar os capitulos da trilha
    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await fetch(`http://localhost:3001/trilha/capitulos/${nivel}/${userId}`, {
                    method: 'GET'
                  });
        
                  if (response.ok) {
                    const data = await response.json();
                    setChapters(Array.isArray(data.chaptersWithCompletion) ? data.chaptersWithCompletion : []);
                  }
                  else{
                    console.log("Erro na requisição de capitulos da trilha");
                  }
            } catch (error) {
                console.error("Erro na requisição:", error);
            }
          
        };
    
        fetchChapters();
    }, [nivel]);


     // função que encaminha para pagina do quiz
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