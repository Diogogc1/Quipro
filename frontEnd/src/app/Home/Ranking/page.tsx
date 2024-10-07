"use client";

import { Header } from "../../components/Header";
import { MenuLateral } from "../../components/MenuLateral";

const usuarioLogado = "https://github.com/AugustoRibeiro7.png";

export default function Ranking() {

    return (
        <>
            <Header srcAvatar={usuarioLogado} />
            <div className="flex">
                <MenuLateral />
                <main></main>
            </div>
        </>
    )
}