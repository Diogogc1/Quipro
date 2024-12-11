import { CheckCircle, Circle, Play } from "phosphor-react";

interface Chapter{
    props:ChapterProps,
    onChapterClick: (id: number, title: string) => void; 
}

interface ChapterProps{
    id:number,
    title:string,
    complete?:boolean,
    functionClick: (id: number) => void;
}

export default function Chapter({id, title, complete, functionClick}:ChapterProps)
{

    return(
            <div 
                key={id}
                onClick={()=> functionClick(id)} // Chama a função ao clicar
                className={`w-full h-[6.5rem] p-6 cursor-pointer bg-zinc-800 rounded-xl border ${!complete ? 'border-zinc-700': 'border-green-500'} flex justify-between items-center`}
            >
                <div className="flex items-center gap-2.5">
                    <div className="w-14 h-14 bg-zinc-900 rounded-xl border border-zinc-700 flex items-center justify-center">
                        <Play className="w-8 h-7 relative text-violet-600" /> 
                    </div>
                    <p>{title}</p>
                </div>
                {complete ? (
                    <CheckCircle weight="fill" className="w-6 h-6 text-green-500" />
                ) : (
                    <Circle weight="fill" className="w-6 h-6 text-zinc-700" />
                )}
            </div>
    )
}