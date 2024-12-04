"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { parseCookies } from 'nookies';
import { ArrowLeft, Atom } from "phosphor-react";

export default function Ranking() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const router = useRouter();
  let userId;

  //configurações de exibição dos capitulos
  const [limite,setLimite] = useState(3); //Começa limitando mostrar 4 capitulos
  const [mostrarTodos, setMostrarTodos] = useState(false); // Estado que controla se deve exibir todos ou não

  const exibirCapitulos = ()=>{
      setMostrarTodos(!mostrarTodos); // Alterna entre mostrar todos ou limitar
      if(mostrarTodos){
          setLimite(3); // Se está mostrando todos, ao clicar limita novamente
      }
      else{
          setLimite(usuarios.length);
      }
  }

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
    <div className="  w-full sm:px-[72px] pb-6 text-white">
      <div className="w-full mx-auto">
        <button onClick={()=>router.back()} className="flex gap-1 items-center text-zinc-500 text-sm leading-snug mb-1">
          <ArrowLeft size={"1rem"} />
          Voltar
        </button>
        <h1 className="text-zinc-400 text-[2rem] font-bold leading-10 mb-6">Ranking</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-zinc-500 text-xl font-medium leading-7">Confira as posições</p>
          <button onClick={exibirCapitulos} className=" text-right text-violet-600 text-sm leading-snug">
            {!mostrarTodos ? 'Ver tudo': 'Ver menos'}
          </button>
        </div>
        <div className=" border rounded-[4px] border-zinc-700 ">
          {usuarios.length > 0 &&
            usuarios.slice(0,limite).map((usuario, index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-4 py-3 min-h-[5.5rem] border-b border-zinc-700 
                  ${index === 0 ? 'rounded-t-[4px]' : ''} 
                  ${index === usuarios.slice(0, limite).length - 1 ? 'rounded-b-[4px] border-b-0' : ''}`}
              >
                <div className="flex items-center space-x-4">
                  {/* Avatar (imagem genérica para exemplo) */}
                  <div className="w-14 h-14 bg-lime-400 rounded-full flex items-center justify-center">
                    <span className="text-zinc-800 font-bold text-2xl">
                      {usuario.userName?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  {/* Nome e pontos */}
                  <div>
                    <p className="font-medium text-xl text-zinc-400 mb-1">{usuario.userName}</p>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Atom size={18} />
                      <p className="text-sm">{usuario.points} átomos</p>
                    </div>
                    
                  </div>
                </div>
                {/* Colocação */}
                <p className="font-semibold text-xl">
                  {index + 1}º lugar
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}