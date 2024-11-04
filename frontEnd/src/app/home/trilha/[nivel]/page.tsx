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
    completed: boolean;
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
    const handleChapterClick = (id, title) => {
    sessionStorage.setItem('quizParams', JSON.stringify({ id, title }));
    router.push(`/home/trilha/${nivel}/quizpage`);
    };

    //compactando dados para enviar como parametro
    const trilha ={
        nome: nivel,
        capitulos: chapters,
        onChapterClick:handleChapterClick
    }

    //gerar pagina
    return(
        <>
            <Trail props={trilha} />
        </>
    )


    // const trilhas ={ 
    //     iniciante:{
    //         nome:"Iniciante",
    //         capitulos:[
    //             {
    //                 id:1,
    //                 nome:"Introdução a Quimica",
    //                 link:"../trilha/quizpage",
    //                 complete:true,
    //             },
    //             {
    //                 id:2,
    //                 nome:"Ligações Quimicas",
    //                 link:"",
    //                 complete:false,
    //             },
    //             {
    //                 id:3,
    //                 nome:"Atomos",
    //                 link:"",
    //                 complete:false,
    //             },
    //             {
    //                 id:4,
    //                 nome:"Termoquímica",
    //                 link:"",
    //                 complete:false,
    //             },
    //             {
    //                 id:5,
    //                 nome:"Mol",
    //                 link:"",
    //                 complete:false,
    //             },
    //         ]
    //     },
    //     intermediaria:{
    //         nome:"Intermediária",
    //         capitulos:[
    //             {
    //                 id:1,
    //                 nome:"Processos de oxidação e redução",
    //                 link:"",
    //                 complete:true,
    //             },
    //             {
    //                 id:2,
    //                 nome:"Balanceamento de reações redox",
    //                 link:"",
    //                 complete:true,
    //             },
    //             {
    //                 id:3,
    //                 nome:"Eletroquímica",
    //                 link:"",
    //                 complete:false,
    //             },
    //             {
    //                 id:4,
    //                 nome:"Pilhas e baterias",
    //                 link:"",
    //                 complete:false,
    //             },
    //             {
    //                 id:5,
    //                 nome:"Química da eletrólise em escala laboratorial e industrial",
    //                 link:"",
    //                 complete:false,
    //             },
    //             {
    //                 id:6,
    //                 nome:"Termoquímica",
    //                 link:"",
    //                 complete:false,
    //             },
    //         ]
    //     },
    //     avancada:{
    //         nome:"Avançada",
    //         capitulos:[
    //             {
    //                 id:1,
    //                 nome:"Equilíbrio químico e iônico",
    //                 link:"",
    //                 complete:false,
    //             },
    //             {
    //                 id:2,
    //                 nome:"Radioatividade",
    //                 link:"",
    //                 complete:false,
    //             },
    //             {
    //                 id:3,
    //                 nome:"Química orgânica",
    //                 link:"",
    //                 complete:false,
    //             },
    //             {
    //                 id:4,
    //                 nome:"Termoquímica",
    //                 link:"",
    //                 complete:false,
    //             },
    //             {
    //                 id:5,
    //                 nome:"Termoquímica.",
    //                 link:"",
    //                 complete:false,
    //             },
                
    //         ]
    //     }
    // };

    // if(!trilhas[nivel])
    // {
    //     return notFound();
    // }

    // const trilhaData = trilhas[nivel];

    // return(
    //     <>
    //         <Trail props={trilhaData} />
    //     </>
    // )
}