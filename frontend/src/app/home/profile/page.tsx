"use client"

import { UserContext } from "@/contexts/userContext"
import { useContext } from "react"

export default function Profile() {
    const { usuarioLogado } = useContext(UserContext)
    console.log(`AAAA: ${usuarioLogado}`)
    return (
        <div>
            <h1 className="text-white">Profile</h1>
            <p className="text-white">{usuarioLogado?.email}</p>

        </div>
    )
}