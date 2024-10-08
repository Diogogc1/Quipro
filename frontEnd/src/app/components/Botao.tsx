import { ButtonHTMLAttributes } from "react";

interface BottonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  notBorder?:boolean
}

export function Botao({notBorder=false, content, ...props }: BottonProps) {
  return (
    <>
      <button
        {...props}
        className={`w-[15.0625rem] h-[3rem] border border-lime-400 px-4 py-[0.625rem] text-white rounded-full hover:border-lime-300 transition-colors duration-200
                    ${notBorder ? 'border-0' : 'border border-'}
                `}
      >
        {content}
      </button>
    </>
  );
}
