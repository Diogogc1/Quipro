import Link from "next/link";
import { CheckCircle, Circle } from "phosphor-react";

interface Chapter{
    props:ChapterProps,
    onChapterClick: (id: number, title: string) => void; 
}

interface ChapterProps{
    id:number,
    nome:string,
    complete:boolean,
}

export default function Chapter({props, onChapterClick}:Chapter)
{

    return(
            <div 
                key={props.id}
                onClick={()=> onChapterClick(props.id, props.nome)} // Chama a função ao clicar
                className={`w-full h-[6.5rem] p-6 bg-zinc-800 rounded-xl border ${!props.complete ? 'border-zinc-700': 'border-green-500'} flex justify-between items-center`}
            >
                <div className="flex items-center gap-2.5">
                    <div className="w-14 h-14 bg-zinc-900 rounded-xl border border-zinc-700 flex items-center justify-center">
                        <div className="w-6 h-6 relative" /> 
                    </div>
                    <p>{props.nome}</p>
                </div>
                {props.complete ? (
                    <CheckCircle weight="fill" className="w-6 h-6 text-green-500" />
                ) : (
                    <Circle weight="fill" className="w-6 h-6 text-zinc-700" />
                )}
            </div>
    )
}