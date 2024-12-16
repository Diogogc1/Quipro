"use client"

import { ScoreProvider } from '@/contexts/ScoreContext';
import { Header } from "../components/Header";
import { SideMenu } from "../components/SideMenu";
import { useAuth } from "../utils/auth";


export default function GeralLayout({ children }: { children: React.ReactNode }) {

    //Autenticando se usuário está logado
    const token = useAuth(); 
    if(!token) return null;


    return (
    <>
        <ScoreProvider >
            <Header />
            <div className=" flex bg-zinc-900">
                <SideMenu />
                <main className="flex-grow px-2 sm:px-8 pt-10">
                    {children}
                </main>
            </div>
        </ScoreProvider>
        
    </>

    );
  }