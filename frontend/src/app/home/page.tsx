"use client"

import { useEffect, useState } from "react";
import { ButtonRoute } from "../components/ButtonRoute";
import { TrailCard } from "../components/TrailCard";
import { parseCookies } from 'nookies';
import { ButtonLimitsView } from "../components/ButtonLimitsView";


interface ChaptersProps{
    id: number,
    title: string,
    trailId: number,
    createdAt: Date
}

export default function Home() {

    //recebendo dados dos cookies
    const cookies = parseCookies();
    const userId = cookies.idUser;
    const token = cookies.authToken;
    //estados
    const [chapters, setChapters] = useState<ChaptersProps[]>([]);
    const lastChapterAcessedId = cookies.lastChapterAcessedId;
    const [trailTitle, setTrailTitle] = useState<string | null>(null);
    //configurações de exibição dos capitulos
    const [limite,setLimite] = useState(3);

    //requisição para buscar o titulo da trilha (para usar como parte da rota da requisição)
    const fetchTrailTitle = async (trailId: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trail/get-trail-title/${trailId}`,{
                headers:{
                    'Authorization': `Bearer ${token}`, //cabeçalho de autorização
                }
            });
            if (response.ok) {
                const { title } = await response.json();
                setTrailTitle(title);
            } else {
                console.error(`Erro ao buscar título da trilha com ID ${trailId}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    // requisição para buscar capitulos que ainda não foram concluidos pelo usuario (recomendações)
    useEffect(()=>{
    const fetchChapter = async ()=>{
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter/get-incomplete-chapters/${lastChapterAcessedId}/${userId}`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, //cabeçalho de autorização
                },
            });

            if (response.ok) {
                const {incompleteChapters} = await response.json();
                setChapters(Array.isArray(incompleteChapters) ? incompleteChapters : []);

                // Buscar título da trilha para o primeiro capítulo
                if(incompleteChapters.length > 0 && !trailTitle){
                    fetchTrailTitle(incompleteChapters[0].trailId);
                }
              }
              else{
                console.log("Erro na requisição de capitulos não completados");
              }

        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

        fetchChapter();
    },[lastChapterAcessedId, trailTitle, userId]);
    
    
    return (
        <div className="sm:px-[48px] md:px-[73px]">
            <div>
                <h1 className="text-zinc-400 text-[2rem] font-bold text-center sm:text-start">Trilhas</h1>
                <p className="text-zinc-500 text-sm font-normal leading-snug text-center sm:text-start">Fique à vontade para aprender da forma que você desejar, de onde estiver.</p>
                <div className="mt-6 flex gap-8 justify-center sm:justify-start">
                    <ButtonRoute name="Iniciante" type="Play" link="home/trail/Iniciante" />
                    <ButtonRoute name="Intermediário" type="TestTube" link="home/trail/Intermediario" />
                    <ButtonRoute name="Avançado" type="Medal" link="home/trail/Avancado" />
                </div>
            </div>

            <div className="md:w-[1040px] mt-[4.1875rem]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-zinc-400 text-xl">Recomendações para você</h2>
                    <ButtonLimitsView conteudoLength={chapters.length} limitView={3} limite={limite} setLimite={setLimite} />
                </div>
                <div className="flex flex-wrap gap-5 justify-center sm:justify-start mb-8">
                    {chapters?.slice(0,limite).map((chapter, index)=>{
                        return(
                            <TrailCard key={chapter.id} name={chapter.title} index={index} id={chapter.id} trailTitle={trailTitle} />
                        );
                    })}
                </div>
            </div>   
        </div>
    )
}