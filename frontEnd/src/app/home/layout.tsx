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
            <Header srcAvatar={"https://s3-alpha-sig.figma.com/img/97ad/36c6/71ab34d8f5275057d6062e3e567e10ec?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZhBzhqtHzfCBj8VbWnqbnDrtehtwBcaX~rY1WKc7fYouE2MzlgniIdb9Qq9rSQlxn~oH6udoeLDJZnYnbcmoNr1Do8jFSpcKMKLozuymEASXN6sOSNsRZBOYXUQziErhAmLEhcLbHTvQRFMnr61o85eK-GJtZUAvn8Y6WjG-OCF4ptdM97yvu1cB8eQ46ddpIpRuDoHVlQcikABCkg169g4dCFMbJsRlZQBEYsAzVjKVleOKdG4Ce6ks8DnXupLmAqM4nYU7FKHLjpJMojMk85KmyJjom-2~M~MRAIA9jDGXtfBuYl6vPTrMfmSvVeeeBGhnGWx~NVfe5zH2SXcu6Q__"} />
            <div className="flex bg-zinc-900">
                <SideMenu />
                <main className="flex-grow px-8 pt-10">
                    {children}
                </main>
            </div>
        </ScoreProvider>
        
    </>

    );
  }