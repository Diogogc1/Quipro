"use client"

import { EnvelopeSimple, LockSimple } from "phosphor-react";
import Image from 'next/image'

export default function login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-10">
      <Image src={'/logo.svg'} width="200" height="64" />
      <form action="" className="flex flex-col gap-4">
        <div className="w-[500px] flex flex-col gap-5">
          <div className="relative group w-full">
            <input
              id="email"
              type="text"
              placeholder="Informe seu e-mail"
              className="w-full h-12 font-roboto bg-zinc-900 border border-zinc-700 text-xl p-4 pl-14 pr-4 border-solid border rounded-full focus:outline-none focus:border-violet-600"
            />
            
            <EnvelopeSimple size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-lime-400" />
            
          </div>

          <div className="relative group w-full">
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              className="w-full h-12 font-roboto bg-zinc-900 border border-zinc-700 text-xl p-4 pl-14 pr-4 border-solid border rounded-full focus:outline-none focus:border-violet-600"
            />
            
            <LockSimple size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-lime-400" />
            
          </div>
        </div>
        <div className="w-[500px] flex flex-col gap-4">
          <button type="button" className="ml-auto text-violet-600 text-sm tracking-wide">Esqueceu sua senha?</button>
          <div className="flex w-full gap-4">
            <button type="submit" className="w-[15.0625rem] h-[3rem] border border-lime-400 px-4 py-[0.625rem] text-white rounded-full hover:border-lime-300 transition-colors duration-200">Entrar com o Google</button>
            <button type="submit" className="w-[15.0625rem] h-[3rem] bg-violet-600 px-4 py-[0.625rem] text-white font-bold rounded-full hover:bg-violet-500 transition-colors duration-200">Entrar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
