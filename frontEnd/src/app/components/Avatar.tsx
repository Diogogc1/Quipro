import { parseCookies } from "nookies";


export function Avatar()
{
    //recebendo userName que esta armazenado no cookie
    const cookies = parseCookies();
    const userName = cookies.userName;

    return(
        <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center border border-zinc-700">
                    <span className="text-zinc-800 font-bold text-lg">
                      {userName?.[0]?.toUpperCase() || "U"}
                    </span>
        </div>
    )
}