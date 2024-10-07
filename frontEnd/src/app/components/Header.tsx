import { Avatar } from "./Avatar";
export interface HeaderProps{
    srcAvatar: string;
}

const numAtomos =32;

export function Header({srcAvatar}: HeaderProps)
{
    return(
        <header className="flex justify-between items-center bg-zinc-800 h-20 border border-zinc-700 px-8">
            <img className="h-10" src={"/logo.svg"} alt="Logotipo da Plataforma Quipro"/>
            <div className="flex justify-around items-center w-[13.3125rem]">
                <div className="flex justify-between items-center w-[8.8125rem] h-12 border border-zinc-700 rounded-full gap-x-3 px-4">
                    <img src='/assets/atomoIcon.svg' className="h-6" alt="" />
                    <p className="text-sm text-zinc-400">{numAtomos} átomos</p>
                </div>
                <Avatar src={srcAvatar} />
            </div>
        </header>
    )
}