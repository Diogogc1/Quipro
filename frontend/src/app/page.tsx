import Image from "next/image";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen pb-10 font-[family-name:var(--font-geist-sans)]">
      <main className="w-11/12 flex flex-col gap-10  items-center">
        <Image
          src="/logo.svg"
          alt="Quipro logo"
          width={400}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal sm:text-sm text-left font-[family-name:var(--font-geist-mono)] space-y-3">
          <li>Explore, jogue e conquiste sua jornada na química!</li>
          <li>Cada resposta é um passo rumo ao domínio da química.</li>
          <li>Descubra a química no seu ritmo, um quiz de cada vez.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="font-bold rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-violet-600 gap-2 hover:bg-[#383838] dark:hover:bg-violet-500 text-xl sm:text-base h-14 sm:h-12 px-4 sm:px-5 w-64 sm:w-44"
            href="/login"
            rel="noopener noreferrer"
          >
            Entrar
          </a>
          <a
            className="rounded-full border border-lime-400 transition-colors flex items-center justify-center hover:border-lime-300 hover:bg-zinc-800 text-xl sm:text-base h-14 sm:h-12 px-4 sm:px-5 w-64 sm:w-44"
            href="/signup"
            rel="noopener noreferrer"
          >
            Cadastrar
          </a>
        </div>
      </main>
      
      {/* footer que não será implementado no momento
      <footer className="absolute bottom-4 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/assets/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Sobre
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/assets/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Termos
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/assets/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Redes Sociais
        </a>
      </footer> */}
    </div>
  );
}
