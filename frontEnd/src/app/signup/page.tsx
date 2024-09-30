"use client"

import { CalendarBlank, EnvelopeSimple, LockSimple, UserCircle } from "phosphor-react";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from 'next/image';

const signUpFormValidationSchema = zod.object({
    email: zod.string().email('E-mail inválido'),
    userName: zod.string().min(3, 'Nome tem que ter pelo menos 3 caracteres'),
    dateOfBirth: zod.string().refine((value) => {
        return !isNaN(Date.parse(value));
    }, 'Data de nascimento inválida'),
    password: zod.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: zod.string().min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
});

type SignUpFormData = zod.infer<typeof signUpFormValidationSchema>;

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpFormValidationSchema)
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('User created:', result);
                // Aqui você pode redirecionar o usuário ou mostrar uma mensagem de sucesso
            } else {
                const error = await response.json();
                console.error('Failed to create user:', error);
                // Aqui você pode exibir uma mensagem de erro
            }
        } catch (error) {
            console.error('Error:', error);
            // Aqui você pode exibir uma mensagem de erro
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-10">
            <Image alt="logo" src={'/logo.svg'} width="200" height="64" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-[500px] flex flex-col gap-4">
                    <div className="relative w-full">
                        <input
                            id="email"
                            type="text"
                            placeholder="Informe seu melhor e-mail"
                            className="w-full h-12 font-roboto bg-zinc-950 text-xl p-4 pl-14 pr-4 border-solid border rounded-full"
                            {...register('email')}
                        />
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <EnvelopeSimple size={24} />
                        </div>
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                    <div className="relative w-full">
                        <input
                            id="userName"
                            type="text"
                            placeholder="Escolha um nome de usuário"
                            className="w-full h-12 font-roboto bg-zinc-950 text-xl p-4 pl-14 pr-4 border-solid border rounded-full"
                            {...register('userName')}
                        />
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <UserCircle size={24} />
                        </div>
                        {errors.userName && <span>{errors.userName.message}</span>}
                    </div>

                    <div className="relative w-full">
                        <input
                            id="dateOfBirth"
                            type="date"
                            placeholder="dd/mm/yyyy"
                            className="w-full h-12 font-roboto bg-zinc-950 text-xl p-4 pl-14 pr-4 border-solid border rounded-full"
                            {...register('dateOfBirth')}
                        />
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <CalendarBlank size={24} />
                        </div>
                        {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
                    </div>

                    <div className="relative w-full">
                        <input
                            id="password"
                            type="password"
                            placeholder="Crie uma senha forte"
                            className="w-full h-12 font-roboto bg-zinc-950 text-xl p-4 pl-14 pr-4 border-solid border rounded-full"
                            {...register('password')}
                        />
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <LockSimple size={24} />
                        </div>
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>

                    <div className="relative w-full">
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirme a senha criada"
                            className="w-full h-12 font-roboto bg-zinc-950 text-xl p-4 pl-14 pr-4 border-solid border rounded-full"
                            {...register('confirmPassword')}
                        />
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <LockSimple size={24} />
                        </div>
                        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full h-12 rounded-full bg-violet-600 text-white text-xl"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    )
}
