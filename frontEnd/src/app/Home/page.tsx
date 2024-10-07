"use client";

import { ButtonRoute } from "../components/ButtonRoute";
import { Header } from "../components/Header";
import { MenuLateral } from "../components/MenuLateral";
import { TrailCard } from "../components/TrailCard";



const usuarioLogado = "https://github.com/AugustoRibeiro7.png";

export default function Home() {

    return (
        <>
            <Header srcAvatar={usuarioLogado} />
            <div className="flex">
                <MenuLateral />
                <main className="px-8 pt-10">
                    <div>
                        <h1 className="text-zinc-400 text-[2rem] font-bold">Trilhas</h1>
                        <p className="text-zinc-500 text-sm font-normal leading-snug">Fique à vontade para aprender da forma que você desejar, de onde estiver.</p>
                        <div className="mt-6">
                            <ButtonRoute name="Iniciante" type="Play" />
                            <ButtonRoute name="Iniciante" type="TestTube" />
                            <ButtonRoute name="Iniciante" type="Medal" />
                        </div>
                    </div>

                    <div className="mt-[4.1875rem]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-zinc-400 text-xl">Recomendações para você</h2>
                            <button className="text-right text-violet-600 text-sm">Ver tudo</button>
                        </div>
                        <div className="flex flex-wrap gap-5">
                            <TrailCard name="Ligações Quimicas" type="ArrowsIn" />
                            <TrailCard name="Ligações Quimicas" type="MathOperations" />
                            <TrailCard name="Ligações Quimicas" type="Atom" />
                        </div>
                    </div>
                    
                </main>
            </div>
            
        </>
    )
}