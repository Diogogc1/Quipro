import { useState } from "react";



interface BottonProps {
  conteudoLength: number,
  limitView: number,
  limite: number; // Recebe o estado atual do limite
  setLimite: (value: number) => void; // Função para alterar o estado do limite
}

export function ButtonLimitsView({limitView, conteudoLength, setLimite}:BottonProps) {

  const [mostrarTodos, setMostrarTodos] = useState(false); // Estado que controla se deve exibir todos ou não

  const exibirConteudo = ()=>{
      setMostrarTodos(!mostrarTodos); // Alterna entre mostrar todos ou limitar
      if(mostrarTodos){
          setLimite(limitView); // Se está mostrando todos, ao clicar limita novamente
      }
      else{
          setLimite(conteudoLength);
      }
  }
  
  return (
    <button onClick={exibirConteudo} className=" text-right text-violet-600 text-sm leading-snug">
            {!mostrarTodos ? 'Ver tudo': 'Ver menos'}
      </button>
  );
}
