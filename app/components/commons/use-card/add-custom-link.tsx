"use client"

import { Plus } from 'lucide-react'
import React, { startTransition, useState } from 'react'
import Modal from '../../ui/modal'
import TextInput from '../../ui/text-input'
import Button from '../../ui/button'
import { useParams, useRouter } from 'next/navigation'
import { addCustomLinks } from '@/app/actions/add-custom-links'

export default function AddCustomLink() {
    const { profileId } = useParams()
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [link1, setLink1] = useState({
        title: "",
        url: ""
    })
    const [link2, setLink2] = useState({
        title: "",
        url: ""
    })

    const [link3, setLink3] = useState({
        title: "",
        url: ""
    })

    const handleSaveCustomLinks = async () => {

        setIsSaving(true)

        if(!profileId) return

        await addCustomLinks({
            profileId: profileId as string,
            link1,
            link2,
            link3
        })

        startTransition(() => {
            setIsModalOpen(false)
            setIsSaving(false)
            router.refresh()
        })
    }
    return (
        <>
            <button className='p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]' onClick={() => setIsModalOpen(true)}>
                <Plus />
            </button>

            <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
                <div className='bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]'>
                    <p className='text-white font-bold text-xl'>Adicionar Links Personalizados</p>

                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2'>
                            <div className='flex flex-col w-full'>
                                <p className=''>Titulo do Link</p>
                                <TextInput placeholder='Digite o titulo' 
                                    value={link1.title} 
                                    onChange={(e) => setLink1({ ...link1, title: e.target.value })}
                                />
                            </div>

                            <div className='flex flex-col w-full'>
                                <p className='font-bold'>Link</p>
                                <TextInput placeholder='Inserir URL' 
                                    value={link1.url} 
                                    onChange={(e) => setLink1({ ...link1, url: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2'>
                            <div className='flex flex-col w-full'>
                                <p className=''>Titulo do Link</p>
                                <TextInput placeholder='Digite o titulo' 
                                    value={link2.title} 
                                    onChange={(e) => setLink2({ ...link2, title: e.target.value })}
                                />
                            </div>

                            <div className='flex flex-col w-full'>
                                <p className='font-bold'>Link</p>
                                <TextInput placeholder='Inserir URL' 
                                    value={link2.url} 
                                    onChange={(e) => setLink2({ ...link2, url: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2'>
                            <div className='flex flex-col w-full'>
                                <p className=''>Titulo do Link</p>
                                <TextInput placeholder='Digite o titulo' 
                                    value={link3.title} 
                                    onChange={(e) => setLink3({ ...link3, title: e.target.value })}
                                />
                            </div>

                            <div className='flex flex-col w-full'>
                                <p className='font-bold'>Link</p>
                                <TextInput placeholder='Inserir URL' 
                                    value={link3.url} 
                                    onChange={(e) => setLink3({ ...link3, url: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end gap-4'>
                        <button className='font-bold text-white' onClick={() => setIsModalOpen(false)}>
                            Voltar
                        </button>
                        <Button onClick={handleSaveCustomLinks} disabled={isSaving}>
                            Salvar
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
