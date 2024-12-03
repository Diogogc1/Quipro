"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { parseCookies } from 'nookies';

export default function Ranking() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const router = useRouter();

  let userId;

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:3001/usuario/ranking");
      const {ranking} = await response.json();
      setUsuarios(ranking);
      console.log(ranking);
    } catch (error) {
      alert("Erro ao buscar usuários");
    }
  };

  useEffect(() => {
    fetchUsuarios();
    //recebendo id do usuario que esta armazenado no cookie
    const cookies = parseCookies();
    userId = cookies.idUser;
  }, []);

  return (
    <div className=" w-full px-4 py-8 text-white">
      <div className="w-full mx-auto">
        <button onClick={()=>router.back()} className="text-gray-400 text-sm mb-4 inline-block">← Voltar</button>
        <h1 className="text-2xl font-semibold mb-2">Ranking</h1>
        <p className="text-gray-400 mb-6">Confira as posições</p>
        <div className=" border rounded-xl border-zinc-700 ">
          {usuarios.length > 0 &&
            usuarios.map((usuario, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-zinc-700 px-4 py-3"
              >
                <div className="flex items-center space-x-4">
                  {/* Avatar (imagem genérica para exemplo) */}
                  <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center">
                    <span className="text-zinc-800 font-bold text-lg">
                      {usuario.userName?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  {/* Nome e pontos */}
                  <div>
                    <p className="font-medium">{usuario.userName}</p>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <img src="/assets/atomoIcon.svg" className="h-4" alt="Ícone de Átomo" />
                      <p className="text-sm ">{usuario.points} átomos</p>
                    </div>
                    
                  </div>
                </div>
                {/* Colocação */}
                <p className="font-semibold text-lg">
                  {index + 1}º lugar
                </p>
              </div>
            ))}
        </div>
        <a href="#" className="text-purple-400 text-sm mt-6 inline-block">Ver tudo</a>
      </div>
    </div>
  );
}