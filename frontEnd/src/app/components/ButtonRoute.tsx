import { Play, TestTube, Medal } from "phosphor-react";

interface ButtonRouteProps{
    name:string,
    type: "Play" | "TestTube" | "Medal"
}

export function ButtonRoute({name, type}:ButtonRouteProps) {

  const icons = {
    Play: Play,
    TestTube: TestTube,
    Medal: Medal,
  };

  const IconComponent = icons[type];

  return (
    <>
      <button className="w-[4.375rem] h-[5.125rem] flex-col justify-start items-center gap-1 inline-flex">
        <div className="p-4 bg-zinc-800 rounded-xl border border-zinc-700 justify-start items-center gap-2.5 inline-flex hover:border-lime-400 transition-colors duration-250">
          <IconComponent className="w-6 h-6 text-violet-600" />
        </div>
        <div className="self-stretch text-center text-zinc-400 text-sm font-normal font-['Inter'] leading-snug">
          {name}
        </div>
      </button>
    </>
  );
}
