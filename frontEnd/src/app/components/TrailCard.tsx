import { ArrowsIn, MathOperations, Funnel, Atom } from "phosphor-react";

interface TrailCardProps {
  name: string;
  type: "ArrowsIn" | "MathOperations" | "Funnel" | "Atom"
}

export function TrailCard({ name, type }: TrailCardProps) {

  const icons = {
    ArrowsIn: ArrowsIn,
    MathOperations: MathOperations,
    Funnel: Funnel,
    Atom:Atom 
  };

  const IconComponent = icons[type];

  return (
    <>
      <div className="h-56 p-6 bg-zinc-800 rounded-xl border border-zinc-700 flex-col justify-start items-start gap-2.5 inline-flex hover:border-violet-600 transition-colors duration-250">
        <div className="w-[293px] justify-between items-start inline-flex">
          <div className="w-14 h-14 relative bg-zinc-900 rounded-xl border border-zinc-700">
            <IconComponent className="w-6 h-6 left-[16px] top-[16px] absolute text-lime-400" />
          </div>
          <img
            className="w-[12.3125rem] h-[8.625rem]"
            src="/assets/images/card.png"
          />
        </div>
        <div className="self-stretch text-zinc-400 text-xl leading-7">
          {name}
        </div>
      </div>
    </>
  );
}
