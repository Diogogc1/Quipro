"use client";

import { useAuth } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Ranking() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const token = useAuth();
  const router = useRouter();

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:3001/usuario/ranking");
      const data = await response.json();
      setUsuarios(data);
      console.log(data);
    } catch (error) {
      alert("Erro ao buscar usuários");
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen px-4 py-8 text-white">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => router.push("/home/profile")} className="text-gray-400 text-sm mb-4 inline-block">← Voltar</button>
        <h1 className="text-2xl font-semibold mb-2">Ranking</h1>
        <p className="text-gray-400 mb-6">Confira as posições</p>
        <div className="space-y-4">
          {usuarios.length > 0 &&
            usuarios.map((usuario, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3"
              >
                <div className="flex items-center space-x-4">
                  {/* Avatar (imagem genérica para exemplo) */}
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {usuario.nome?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  {/* Nome e pontos */}
                  <div>
                    <p className="font-medium">{usuario.nome}</p>
                    <p className="text-sm text-gray-400">{usuario.ranking} átomos</p>
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