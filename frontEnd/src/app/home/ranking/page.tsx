"use client"

import { UserContext } from "@/contexts/userContext"
import { useContext, useEffect, useState } from "react"

export default function Ranking() {
    const { usuarioLogado } = useContext(UserContext)
    const [usuarios, setUsuarios] = useState<any[]>([]);

    const fetchUsuarios = async () => {
        try {
            const response = await fetch("http://localhost:3001/usuario/listar");
            const data = await response.json();
            setUsuarios(data);
            console.log(data);
        } catch (error) {
            alert("Erro ao buscar usuários");
        }
    }

    useEffect(() => {
        fetchUsuarios()
    }, [])

    return (
        <>
            <h1 className="text-white">Ranking</h1>
            {usuarios.length > 0 &&
                usuarios.map((usuario, index) => (
                    <div className="text-white" key={index}>
                        <p>{usuario.email}</p>
                        <p>{usuario.pontuacao}</p>
                    </div>
                ))
            }
        </>
    )
}