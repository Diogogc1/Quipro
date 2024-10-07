import { useRouter, usePathname } from 'next/navigation';

export function MenuLateral()
{

    const router = useRouter();
    const pathname = usePathname();

  return(
    <aside className=" min-h-[calc(100vh-5rem)] w-[14.5rem] border-r border-zinc-800 flex flex-col items-center justify-between py-10">
        <div className="text-center">
            <button 
                className={`w-[168px] h-12 px-3 py-2 rounded-lg justify-start items-center gap-3 inline-flex ${pathname === '/Home' ? 'bg-zinc-800' : 'border-transparent'} `}
                onClick={() => router.push('/Home')}
            >
                <div className="w-8 h-8 relative" />
                <p className="text-zinc-300 text-base">Home</p>
            </button>
            <button 
                className={`w-[168px] h-12 px-3 py-2 rounded-lg justify-start items-center gap-3 inline-flex ${pathname === '/Home/Ranking' ? 'bg-zinc-800' : 'border-transparent'} `}
                onClick={() => router.push('/Home/Ranking')}
            >
                <div className="w-8 h-8 relative" />
                <p className="text-zinc-500 text-base font-normal">Ranking</p>
            </button>
        </div>
        <div>
            <div className="w-[168px] h-12 px-3 py-2 justify-start items-center gap-3 inline-flex">
                <div className="w-8 h-8 relative" />
                <button className="text-zinc-500 text-base font-normal font-['Inter'] leading-normal">Ajuda</button>
            </div>
        </div>
    </aside>
  )
}