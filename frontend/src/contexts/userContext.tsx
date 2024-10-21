"use client"

import Usuario from '@/DTOs/usuario';
import React, { createContext, useState } from 'react';

interface userContext {
    usuarioLogado: Usuario,
    atualizarUsuarioLogado: (usuario: Usuario) => void,
    carregando: boolean
}

const UserContext = createContext<userContext>({
    usuarioLogado: {
        id: 0,
        email: "",
        name: ""
    },
    atualizarUsuarioLogado: () => { },
    carregando: true
});

function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [usuarioLogado, setUsuarioLogado] = useState<Usuario>({
        id: 0,
        email: "",
        name: ""
    },)
    const [carregando, setCarregando] = useState<boolean>(true)

    function atualizarUsuarioLogado(usuario: Usuario) {
        setUsuarioLogado(usuario)
    }

    return (
        <UserContext.Provider value={{ usuarioLogado, atualizarUsuarioLogado, carregando }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }