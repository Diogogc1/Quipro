"use client";

import { Atom } from "phosphor-react";
import { Avatar } from "./Avatar";
import { useScore } from "@/contexts/ScoreContext"; // Importando o contexto

export interface HeaderProps{
    srcAvatar: string;
}

export function Header()
{
    // Consome o contexto de pontuação
    const { score } = useScore();

    return (
        <header className="flex justify-between items-center bg-zinc-800 h-16 sm:h-20 border border-zinc-700 px-1 sm:px-8">
            {/* Logotipo da plataforma */}
            <img className="h-10" src="/logo.svg" alt="Logotipo da Plataforma Quipro" />

            <div className="flex justify-around items-center w-[13.3125rem]">
                {/* Exibição do número de pontos */}
                <div className="flex justify-center items-center w-[8.8125rem] h-12 border border-zinc-700 rounded-full gap-x-3 px-4">
                    <Atom size={24} className="text-violet-600" />
                    <p className="text-sm font-bold text-zinc-400">{score} átomos</p>
                </div>

                {/* Avatar do usuário */}
                <Avatar />
            </div>
        </header>
    );
}