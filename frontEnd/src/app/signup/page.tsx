"use client";

import {
  CalendarBlank,
  EnvelopeSimple,
  LockSimple,
  UserCircle,
  ArrowLeft
} from "phosphor-react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";

const signUpFormValidationSchema = zod
  .object({
    email: zod.string().email("E-mail inválido"),
    userName: zod.string().min(3, "Minimo de 3 caracteres"),
    dateBirth: zod.string().refine((value) => {
      return !isNaN(Date.parse(value));
    }, "Data inválida"),
    password: zod.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: zod
      .string()
      .min(6, "Deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

type SignUpFormData = zod.infer<typeof signUpFormValidationSchema>;

export default function SignUp() {

  //estado para mensagem de sucesso e erro no cadastro
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  //estado para controle da tipagem do input de data de aniversario
  const [isDateFocused, setIsDateFocused] = useState(false);

  const router = useRouter(); // Inicializando o useRouter

  //funções para controle da tipagem do input de data de aniversario
  const handleFocus = () => {
    setIsDateFocused(true);
  };

  const handleBlur = () => {
    setIsDateFocused(false);
    
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormValidationSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await fetch("http://localhost:3001/usuario/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setErrorMessage(null);
        setSuccessMessage("Usuário cadastrado com sucesso!");
        setTimeout(() => {
          router.push("../login");
        }, 1000); // Redireciona após 2 segundos para tela de login
      } else {
        setErrorMessage('Email ou Usuário já cadastrado!');
      }
    } catch (error) {
      setErrorMessage("Ocorreu um erro ao processar o cadastro.");
    }
  };
  

  return (
    <div className="bg-zinc-900 flex flex-col items-center justify-center min-h-screen gap-10">
      <Image alt="logo" src={"/logo.svg"} width="200" height="64" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={ `w-full sm:w-[510px] flex flex-col gap-4 text-xl sm:text-lg px-2 sm:px-0`}>
          <div className="relative w-full group">
            <input
              id="email"
              type="text"
              maxLength={50}
              placeholder="Informe seu melhor e-mail"
              className="text-gray-500 w-full h-12 font-roboto bg-zinc-900 border border-zinc-700 p-4 pl-14 pr-4 border-solid rounded-full focus:outline-none focus:border-violet-600"
              {...register("email")}
            />
            <div className={`absolute left-4 flex items-center pointer-events-none ${errors.email ? 'bottom-9' : 'inset-y-0'}`}>
              <EnvelopeSimple className="text-gray-500 transition-colors group-focus-within:text-lime-400" size={24} />
            </div>
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>
          <div className="justify-start items-center gap-4 sm:gap-1 inline-flex flex-wrap sm:flex-nowrap">
            <div className="relative w-full group">
              <input
                id="userName"
                type="text"
                maxLength={25}
                placeholder="Escolha um nome de usuário"
                className="text-gray-500 w-full sm:w-[307px] h-12 font-roboto bg-zinc-900 border-zinc-700 p-4 pl-14 pr-4 border-solid border rounded-full focus:outline-none focus:border-violet-600"
                {...register("userName")}
              />
              <div className={`absolute left-4 flex items-center pointer-events-none ${errors.userName ? 'bottom-9' : 'inset-y-0'}`}>
                <UserCircle className="text-gray-500 transition-colors group-focus-within:text-lime-400" size={24} />
              </div>
              {errors.userName && <ErrorMessage message={errors.userName.message} />}
            </div>

            <div className="relative w-full group">
              <input
                id="dateBirth"
                type={isDateFocused ? "date" : "text"}
                onFocus={handleFocus}
                placeholder="Seu aniversário"
                className="text-gray-500 w-full sm:w-[198px] h-12 font-roboto bg-zinc-900 border-zinc-700 appearance-none p-4 pl-14 pr-4 border-solid border rounded-full focus:outline-none focus:border-violet-600"
                {...register("dateBirth",{
                  onBlur: ()=>{
                    handleBlur();
                  }
                })}
              />
              <div className={`absolute left-4 flex items-center pointer-events-none ${errors.dateBirth ? 'bottom-9' : 'inset-y-0'}`}>
                <CalendarBlank className="text-gray-500 transition-colors group-focus-within:text-lime-400" size={24} />
              </div>
              {errors.dateBirth && <ErrorMessage message={errors.dateBirth.message} />}
            </div>
          </div>

          <div className="relative w-full group">
            <input
              id="password"
              type="password"
              maxLength={40}
              placeholder="Crie uma senha forte"
              className="text-gray-500 w-full h-12 font-roboto bg-zinc-900 border-zinc-700 p-4 pl-14 pr-4 border-solid border rounded-full focus:outline-none focus:border-violet-600"
              {...register("password")}
            />
            <div className={`absolute left-4 flex items-center pointer-events-none ${errors.password ? 'bottom-9' : 'inset-y-0'}`}>
              <LockSimple className="text-gray-500 transition-colors group-focus-within:text-lime-400" size={24} />
            </div>
            {errors.password && <ErrorMessage message={errors.password.message} />}
          </div>

          <div className="relative group w-full">
            <input
              id="confirmPassword"
              type="password"
              maxLength={40}
              placeholder="Confirme a senha criada"
              className="text-gray-500 w-full h-12 font-roboto bg-zinc-900 border-zinc-700 p-4 pl-14 pr-4 border-solid border rounded-full focus:outline-none focus:border-violet-600"
              {...register("confirmPassword")}
            />
            <div className={`absolute left-4 flex items-center pointer-events-none ${errors.confirmPassword ? 'bottom-9' : 'inset-y-0'}`}>
              <LockSimple className="text-gray-500 transition-colors group-focus-within:text-lime-400" size={24} />
            </div>
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword.message} />
            )}
          </div>
        </div>
        <div className="flex items-center mt-8 gap-4 flex-wrap justify-center text-xl sm:text-base">
            <button
            onClick={()=>router.back()}
              type="button"
              className="flex items-center justify-center gap-3 w-64 sm:w-[15.0625rem] h-[3rem] border border-lime-400 px-4 py-[0.625rem] text-white rounded-full hover:border-lime-300 transition-colors duration-200"
            >
              <ArrowLeft size={24} />
              Voltar
            </button>

          <button
            type="submit"
            className=" w-64 sm:w-[15.0625rem] h-12 rounded-full bg-violet-600 text-white font-bold"
          >
            Cadastrar
          </button>
        </div>
      </form>
      {/* Mensagem de feedback */}
      {successMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
