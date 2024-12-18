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
 
    //processo para buscar conteudo da trilha no banco de dados
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const router = useRouter();

    // Verifica se `nivel` é válido e impede a renderização
    const isTrailValid = permittedTrails.includes(nivel as typeof permittedTrails[number]);

    //requisição para buscar os capitulos da trilha
    useEffect(() => {
        if(isTrailValid){
            const fetchChapters = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trilha/capitulos/${nivel}/${userId}`, {
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
        }
    }, [nivel, userId, isTrailValid]);

    // Gera página ou retorna 404
    if (!permittedTrails.includes(nivel as typeof permittedTrails[number])) {
        return notFound();
    }


    // função que encaminha para pagina do quiz
    const handleChapterClick = (id: number | string) => {
    router.push(`/home/trilha/${nivel}/quizpage/${id}`);
    };

    //gerar pagina
    return(
        <>
            <Trail title={nivel} capitulos={chapters} onChapterClick={handleChapterClick} />
        </>
    )
}