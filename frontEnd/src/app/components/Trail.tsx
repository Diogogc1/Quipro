"use client";

import Link from "next/link";
import { ArrowLeft } from "phosphor-react";
import Chapter from "./Chapter";
import { useState } from "react";

interface TrilhaProps{
    props:Trilha;
}

interface Trilha{
    nome:string,
    capitulos:[
        {
            id: number,
            nome:string,
            complete: boolean,
        }
    ],
    onChapterClick: (id: number, title: string) => void;
}

export default function Trail({props}:TrilhaProps)
{
    const capitulos = props.capitulos;

    //configurações de exibição dos capitulos
    const [limite,setLimite] = useState(4); //Começa limitando mostrar 4 capitulos
    const [mostrarTodos, setMostrarTodos] = useState(false); // Estado que controla se deve exibir todos ou não

    const exibirCapitulos = ()=>{
        setMostrarTodos(!mostrarTodos); // Alterna entre mostrar todos ou limitar
        if(mostrarTodos){
            setLimite(4); // Se está mostrando todos, ao clicar limita novamente
        }
        else{
            setLimite(capitulos.length);
        }
    }

    return(
        <>
            <Link className="flex gap-1 items-center" href={'/home'}>
                <ArrowLeft size={"1rem"} className="text-zinc-500" />
                <p className="text-zinc-500 text-sm leading-snug">Voltar</p>
            </Link>
            <h1 className="text-zinc-400 text-[2rem] font-bold leading-10">
                Trilha {props.nome}
            </h1>
            <div className="flex justify-between mt-">
                <h2 className="text-zinc-500 text-xl font-medium leading-7 mt-6">
                    Continue de onde parou
                </h2>
                <button onClick={exibirCapitulos} className=" text-right text-violet-600 text-sm leading-snug">
                    {!mostrarTodos ? 'Ver tudo': 'Ver menos'}
                </button>
            </div>
            <div className="mt-6 mb-8 flex flex-col gap-5">
                {capitulos.slice(0,limite).map(capitulo=>{
                    return(
                        <Chapter props={capitulo} onChapterClick={props.onChapterClick} />
                    )
                })}
            </div>
        </>
    )

}