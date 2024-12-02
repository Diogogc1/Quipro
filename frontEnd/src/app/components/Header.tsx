"use client";

import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { Avatar } from "./Avatar";
import { useScore } from "@/contexts/ScoreContext"; // Importando o contexto

export interface HeaderProps{
    srcAvatar: string;
}

export function Header({srcAvatar}: HeaderProps)
{
    // //recebendo id do usuario que esta armazenado no cookie
    // const cookies = parseCookies();
    // const userId = cookies.idUser;

    // Consome o contexto de pontuação
    const { score } = useScore();

    //estado dos pontos
    // const [points, setPoints] = useState<number>(0); // Estado para armazenar os pontos do usuário

    // useEffect(() => {
    //     // Função assíncrona para buscar os pontos do usuário
    //     const fetchUserPoints = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3001/usuario/${userId}/points`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error("Erro ao buscar pontos do usuário.");
    //             }

    //             const data = await response.json();
    //             setPoints(data.points || 0); // Atualiza o estado com os pontos retornados
    //         } catch (error) {
    //             console.error("Erro ao buscar pontos do usuário:", error);
    //         }
    //     };

    //     fetchUserPoints(); // Chama a função ao montar o componente
    // }, [userId]); // Reexecuta se o userId mudar

    return (
        <header className="flex justify-between items-center bg-zinc-800 h-20 border border-zinc-700 px-8">
            {/* Logotipo da plataforma */}
            <img className="h-10" src="/logo.svg" alt="Logotipo da Plataforma Quipro" />

            <div className="flex justify-around items-center w-[13.3125rem]">
                {/* Exibição do número de pontos */}
                <div className="flex justify-center items-center w-[8.8125rem] h-12 border border-zinc-700 rounded-full gap-x-3 px-4">
                    <img src="/assets/atomoIcon.svg" className="h-6" alt="Ícone de Átomo" />
                    <p className="text-sm text-zinc-400">{score} átomos</p>
                </div>

                {/* Avatar do usuário */}
                <Avatar src={srcAvatar} />
            </div>
        </header>
    );
}