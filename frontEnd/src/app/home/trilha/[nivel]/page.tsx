import { notFound } from "next/navigation";
import Trail from "@/app/components/Trail";

interface TrilhaProps
{
    params: {
        nivel: string;
    };
}

export default function Trilha({params}:TrilhaProps)
{
    const {nivel} = params;

    //mudar isso para pegar direto no banco de dados
    const trilhas ={ 
        iniciante:{
            nome:"Iniciante",
            capitulos:[
                {
                    id:1,
                    nome:"Introdução a Quimica",
                    link:"../trilha/quizpage",
                    complete:true,
                },
                {
                    id:2,
                    nome:"Ligações Quimicas",
                    link:"",
                    complete:false,
                },
                {
                    id:3,
                    nome:"Atomos",
                    link:"",
                    complete:false,
                },
                {
                    id:4,
                    nome:"Termoquímica",
                    link:"",
                    complete:false,
                },
                {
                    id:5,
                    nome:"Mol",
                    link:"",
                    complete:false,
                },
            ]
        },
        intermediaria:{
            nome:"Intermediária",
            capitulos:[
                {
                    id:1,
                    nome:"Processos de oxidação e redução",
                    link:"",
                    complete:true,
                },
                {
                    id:2,
                    nome:"Balanceamento de reações redox",
                    link:"",
                    complete:true,
                },
                {
                    id:3,
                    nome:"Eletroquímica",
                    link:"",
                    complete:false,
                },
                {
                    id:4,
                    nome:"Pilhas e baterias",
                    link:"",
                    complete:false,
                },
                {
                    id:5,
                    nome:"Química da eletrólise em escala laboratorial e industrial",
                    link:"",
                    complete:false,
                },
                {
                    id:6,
                    nome:"Termoquímica",
                    link:"",
                    complete:false,
                },
            ]
        },
        avancada:{
            nome:"Avançada",
            capitulos:[
                {
                    id:1,
                    nome:"Equilíbrio químico e iônico",
                    link:"",
                    complete:false,
                },
                {
                    id:2,
                    nome:"Radioatividade",
                    link:"",
                    complete:false,
                },
                {
                    id:3,
                    nome:"Química orgânica",
                    link:"",
                    complete:false,
                },
                {
                    id:4,
                    nome:"Termoquímica",
                    link:"",
                    complete:false,
                },
                {
                    id:5,
                    nome:"Termoquímica.",
                    link:"",
                    complete:false,
                },
                
            ]
        }
    };

    if(!trilhas[nivel])
    {
        return notFound();
    }

    const trilhaData = trilhas[nivel];

    return(
        <>
            <Trail props={trilhaData} />
        </>
    )
}