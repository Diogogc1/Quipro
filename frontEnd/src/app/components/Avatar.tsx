import { ImgHTMLAttributes } from "react";

export function Avatar({...props}:ImgHTMLAttributes<HTMLImageElement>)
{
    return(
        <img 
            className="h-10 w-10 rounded-full border border-zinc-700" 
            {...props}
        />
    )
}