"use client"

import { createLink } from '@/app/actions/create-ink'
import { verifyLink } from '@/app/actions/verify-link'
import Button from '@/app/components/ui/button'
import TextInput from '@/app/components/ui/text-input'
import { sanitizeLink } from '@/app/lib/utils'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'

export default function CreateLinkForm() {
    const [link, setLink] =  useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    function handleLinkChange(e: ChangeEvent<HTMLInputElement>){
        setLink(sanitizeLink(e.target.value));
        setError("")
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(link.length == 0) return setError("Escolha um link.")

        const isLinkTake = await verifyLink(link)

        if(isLinkTake) return setError("Link já esta em uso.")

        const isLinkCreated = await createLink(link)    

        if(!isLinkCreated) return setError("Erro ao criar o perfil. Tente novamente mais tarde.")

        router.push(`/${link}`)    
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='w-full flex items-center gap-2'>
                <span className='text-white'>projectbio.com</span>
                <TextInput value={link} onChange={(e) => handleLinkChange(e) } />
                <Button className='w-[126px]'>
                    Criar
                </Button>
            </form>
            <div>
                <span className='text-accent-pink'>{error}</span>
            </div>
        </>
    )
}
