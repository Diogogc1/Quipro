"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle, Circle, Play } from "phosphor-react";

interface TrailCardProps {
  id: number,
  name: string,
  index: number,
  trailTitle: string | null
}

export function TrailCard({ name, index, id, trailTitle }: TrailCardProps) {

  const router = useRouter();

  // encaminha para pagina do quiz
  const handleChapterClick = () => {
    if (trailTitle) {
      router.push(`/home/trilha/${trailTitle}/quizpage/${id}`);
    } else {
      console.error("Título da trilha não encontrado");
    }
    };


  return (
    <>
      <div onClick={handleChapterClick} className={`min-h-56 w-11/12 sm:w-[330px] p-6 bg-zinc-800 rounded-xl border ${index === 0 ? 'border-green-500' : 'border-zinc-700'}  flex-col justify-start items-start gap-2.5 inline-flex hover:border-violet-600 transition-colors duration-250 cursor-pointer`}>
        <div className="w-full justify-between items-start inline-flex">
          <div className=" w-14 h-14 relative bg-zinc-900 rounded-xl border border-zinc-700">
            <Play className="w-6 h-6 left-[16px] top-[16px] absolute text-lime-400" />
          </div>
          <Image
            height={138}
            width={197}
            alt="Imagem ilustrativa, globo com pixels"
            src="/assets/images/card.png"
            unoptimized
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="self-stretch text-zinc-400 text-xl leading-7">
            {name}
          </div>
          {index === 0 ? (
              <CheckCircle weight="fill" className="w-6 h-6 text-green-500" />
          ) : (
              <Circle weight="fill" className="w-6 h-6 text-zinc-700" />
          )}
        </div>
      </div>
    </>
  );
}
