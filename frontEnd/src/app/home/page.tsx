"use client"

import { ButtonRoute } from "../components/ButtonRoute";
import { TrailCard } from "../components/TrailCard";


export default function Home() {
    
    return (
        <>
            <div>
                <h1 className="text-zinc-400 text-[2rem] font-bold">Trilhas</h1>
                <p className="text-zinc-500 text-sm font-normal leading-snug">Fique à vontade para aprender da forma que você desejar, de onde estiver.</p>
                <div className="mt-6 flex gap-8">
                    <ButtonRoute name="Iniciante" type="Play" link="home/trilha/iniciante" />
                    <ButtonRoute name="Intermediário" type="TestTube" link="home/trilha/intermediaria" />
                    <ButtonRoute name="Avançado" type="Medal" link="home/trilha/avancada" />
                </div>
            </div>

            <div className="mt-[4.1875rem]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-zinc-400 text-xl">Recomendações para você</h2>
                    <button className="text-right text-violet-600 text-sm">Ver tudo</button>
                </div>
                <div className="flex flex-wrap gap-5">
                    <TrailCard name="Ligações Quimicas" type="ArrowsIn" />
                    <TrailCard name="Moléculas e macromoléculas" type="MathOperations" />
                    <TrailCard name="Modelos atômicos" type="Atom" />
                </div>
            </div>   
        </>
    )
}