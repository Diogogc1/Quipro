"use client";

import { useRouter, usePathname } from 'next/navigation';
import {House, Question, Trophy} from 'phosphor-react';


export function MenuLateral()
{

    const router = useRouter();
    const pathname = usePathname();

  return(
    <aside className=" min-h-[calc(100vh-5rem)] w-[14.5rem] border-r border-zinc-800 flex flex-col items-center justify-between py-10">
        <div className="text-center flex flex-col gap-6">
            <button 
                className={`w-[168px] h-12 px-3 py-2 rounded-lg justify-start items-center gap-3 inline-flex ${pathname === '/home' ? 'bg-zinc-800' : 'border-transparent'} `}
                onClick={() => router.push('/home')}
            >
                <House className={`w-8 h-8 ${pathname === '/home' ? 'text-violet-600' : 'text-zinc-500'}`} />
                <p className="text-zinc-300 text-base">Home</p>
            </button>
            <button 
                className={`w-[168px] h-12 px-3 py-2 rounded-lg justify-start items-center gap-3 inline-flex ${pathname === '/home/ranking' ? 'bg-zinc-800' : 'border-transparent'} `}
                onClick={() => router.push('/home/ranking')}
            >
                <Trophy className={`w-8 h-8 ${pathname === '/home/ranking' ? 'text-violet-600' : 'text-zinc-500'}`}  />
                <p className="text-zinc-500 text-base font-normal">Ranking</p>
            </button>
        </div>
        <div className='w-[168px]'>
            <button className="items-center gap-3 inline-flex text-zinc-500">
                <Question className="w-8 h-8" />
                <p>Ajuda</p>
            </button>
        </div>
    </aside>
  )
}