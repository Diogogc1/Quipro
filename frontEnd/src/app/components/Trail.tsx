"use client";

import Link from "next/link";
import { ArrowLeft } from "phosphor-react";
import Chapter from "./Chapter";
import { useState } from "react";
import { ButtonLimitsView } from "./ButtonLimitsView";

interface Capitulo{
    id: number,
    title:string,
    complete?: boolean;
}

interface TrilhaProps{
    title:string,
    capitulos:Capitulo[],
    onChapterClick: (id: number) => void;
}

export default function Trail({title, capitulos, onChapterClick}:TrilhaProps)
{

    //configurações de exibição dos capitulos
    const [limite,setLimite] = useState(4); //definindo limite de visualização inicial

    return(
        <>
            <Link className="flex gap-1 items-center" href={'/home'}>
                <ArrowLeft size={"1rem"} className="text-zinc-500" />
                <p className="text-zinc-500 text-sm leading-snug">Voltar</p>
            </Link>
            <h1 className="text-zinc-400 text-[2rem] font-bold leading-10">
                Trilha {title}
            </h1>
            <div className="flex justify-between items-center mt-6">
                <h2 className="text-zinc-500 text-xl font-medium leading-7 ">
                    Continue de onde parou
                </h2>
                <ButtonLimitsView conteudoLength={capitulos.length} limitView={4} limite={limite} setLimite={setLimite} />
            </div>
            <div className="mt-6 mb-8 flex flex-col gap-5">
                {capitulos?.slice(0,limite).map(capitulo=>{
                    return(
                        <Chapter 
                            key={capitulo.id}
                            id={capitulo.id} 
                            title={capitulo.title} 
                            complete={capitulo.complete} 
                            functionClick={onChapterClick} 
                        />
                    )
                })}
            </div>
        </>
    )

}