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
import Link from 'next/link';

const signUpFormValidationSchema = zod
  .object({
    email: zod.string().email("E-mail inválido"),
    userName: zod.string().min(3, "Nome tem que ter pelo menos 3 caracteres"),
    dateBirth: zod.string().refine((value) => {
      return !isNaN(Date.parse(value));
    }, "Data de nascimento inválida"),
    password: zod.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: zod
      .string()
      .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

type SignUpFormData = zod.infer<typeof signUpFormValidationSchema>;

export default function SignUp() {

  const router = useRouter(); // Inicializando o useRouter

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormValidationSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      alert('Entrando em onSubmit');
      alert(JSON.stringify(data, null, 2));
      const response = await fetch("http://localhost:3001/usuario/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('(Usuario cadastrado');
        const result = await response.json();
        console.log("User created:", result);
        router.push("../login"); // Redirecionando usuario para a tela de login
      } else {
        alert('Usuario nao cadastrado: '+ response.status);
        const error = await response.json();
        console.error("Failed to create user:", error);
        // Aqui você pode exibir uma mensagem de erro
      }
    } catch (error) {
      console.error("Error:", error);
      // Aqui você pode exibir uma mensagem de erro
    }
  };

  return (
    <div className="bg-zinc-900 flex flex-col items-center justify-center min-h-screen gap-10">
      <Image alt="logo" src={"/logo.svg"} width="200" height="64" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[500px] flex flex-col gap-4">
          <div className="relative w-full group">
            <input
              id="email"
              type="text"
              placeholder="Informe seu melhor e-mail"
              className="text-gray-500 w-full h-12 font-roboto bg-zinc-900 border border-zinc-700 text-xl p-4 pl-14 pr-4 border-solid rounded-full focus:outline-none focus:border-violet-600"
              {...register("email")}
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <EnvelopeSimple className="text-gray-500 transition-colors group-focus-within:text-lime-400" size={24} />
            </div>
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className="relative w-full group">
            <input
              id="userName"
              type="text"
              placeholder="Escolha um nome de usuário"
              className="text-gray-500 w-full h-12 font-roboto bg-zinc-900 border-zinc-700 text-xl p-4 pl-14 pr-4 border-solid border rounded-full focus:outline-none focus:border-violet-600"
              {...register("userName")}
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <UserCircle className="text-gray-500 transition-colors group-focus-within:text-lime-400" size={24} />
            </div>
            {errors.userName && <span>{errors.userName.message}</span>}
          </div>

          <div className="relative w-full group">
            <input
              id="dateBirth"
              type="date"
              placeholder="dd/mm/yyyy"
              className="text-gray-500 w-full h-12 font-roboto bg-zinc-900 border-zinc-700 text-xl p-4 pl-14 pr-4 border-solid border rounded-full focus:outline-none focus:border-violet-600"
              {...register("dateBirth")}
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <CalendarBlank className="text-gray-500 transition-colors group-focus-within:text-lime-400" size={24} />
            </div>
            {errors.dateBirth && <span>{errors.dateBirth.message}</span>}
          </div>

          <div className="relative w-full group">
            <input
              id="password"
              type="password"
              placeholder="Crie uma senha forte"
              className="text-gray-500 w-full h-12 font-roboto bg-zinc-900 border-zinc-700 text-xl p-4 pl-14 pr-4 border-solid border rounded-full focus:outline-none focus:border-violet-600"
              {...register("password")}
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <LockSimple className="text-gray-500 transition-colors group-focus-within:text-lime-400" size={24} />
            </div>
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <div className="relative group w-full">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirme a senha criada"
              className="text-gray-500 w-full h-12 font-roboto bg-zinc-900 border-zinc-700 text-xl p-4 pl-14 pr-4 border-solid border rounded-full focus:outline-none focus:border-violet-600"
              {...register("confirmPassword")}
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <LockSimple className="text-gray-500 transition-colors group-focus-within:text-lime-400" size={24} />
            </div>
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </div>
        </div>
        <div className="flex items-center mt-8 gap-4">
            <button
            onClick={()=>router.back()}
              type="button"
              className="flex items-center justify-center gap-3 w-[15.0625rem] h-[3rem] border border-lime-400 px-4 py-[0.625rem] text-white rounded-full hover:border-lime-300 transition-colors duration-200"
            >
              <ArrowLeft size={24} />
              Voltar
            </button>

          <button
            type="submit"
            className=" w-[15.0625rem] h-12 rounded-full bg-violet-600 text-white text-xl"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
