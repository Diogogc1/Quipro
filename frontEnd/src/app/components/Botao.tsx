export function Botao({type, content})
{
    return(
        <>
            <button type={type} className="w-[15.0625rem] h-[3rem] border border-lime-400 px-4 py-[0.625rem] text-white rounded-full hover:border-lime-300 transition-colors duration-200">{content}</button>
        </>
    )
}