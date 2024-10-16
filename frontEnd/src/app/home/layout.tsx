"use client";

import { Header } from "../components/Header";
import { MenuLateral } from "../components/MenuLateral";


const usuarioLogado = "https://github.com/AugustoRibeiro7.png";

export default function GeralLayout({ children }: { children: React.ReactNode }) {
    return (
    <>

        <Header srcAvatar={usuarioLogado} />
        <div className="flex">
            <MenuLateral />
            <main className="px-8 pt-10">
                {children}
            </main>
        </div>
        
    </>

    );
  }