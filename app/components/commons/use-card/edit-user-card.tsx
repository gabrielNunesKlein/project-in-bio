"use client"

import { ArrowUpFromLine, UserPen } from 'lucide-react'
import React, { startTransition, useState } from 'react'
import Modal from '../../ui/modal'
import TextInput from '../../ui/text-input'
import TextArea from '../../ui/text-area'
import Button from '../../ui/button'
import { compressFiles, handleImageInput, triggerImageInput } from '@/app/lib/utils'
import { useParams, useRouter } from 'next/navigation'
import { saveProfile } from '@/app/actions/save-profile'
import { ProfileData } from '@/app/server/get-profile-data'

export default function EditUserCard({profileData}: {profileData: ProfileData | undefined}) {
    const router = useRouter()
    const { profileId } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [profilePic, setProfilePic] = useState<string | null>(null)
    const [profileName, setProfileName] = useState(profileData?.name || '')
    const [profileDescription, setProfileDescription] = useState(profileData?.description || '')

    const handleSaveProfile = async () => {
        setIsSaving(true)

        const imagesInput = document.getElementById("profile-pic-input") as HTMLInputElement

        if(!imagesInput.files) return

        const compressFile = await compressFiles(Array.from(imagesInput.files))

        if(!profileId) return

        const formData = new FormData()
        formData.append("profileId", profileId as string)
        formData.append("profilePic", compressFile[0])
        formData.append("yourName", profileName)
        formData.append("yourDescription", profileDescription)

        await saveProfile(formData)

        startTransition(() => {
            setIsModalOpen(false)
            setIsSaving(false)
            router.refresh()
        })
    }
    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>
                <UserPen />
            </button>
            <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
                <div className='bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10'>
                    <p className='text-white font-bold text-xl'>Editar Perfil</p>
                    <div className='flex gap-10'>
                        <div className='flex flex-col items-center gap-3 text-xs'>
                            <div className='w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden'>
                                {profilePic ? (
                                    <img src={profilePic} id='' alt="Dev" className='object-cover object-center' />
                                ) : (
                                    <button className='w-full h-full' onClick={() => triggerImageInput('profile-pic-input')}>100x100</button>
                                )}
                            </div>
                            <button className='text-white flex items-center gap-2' onClick={() => triggerImageInput('profile-pic-input')}>
                                <ArrowUpFromLine className='size-4' />
                                <span>Adicionar foto</span>
                            </button>
                            <input type="file" className='hidden' accept='image/*' id='profile-pic-input' onChange={(e) => setProfilePic(handleImageInput(e))} />
                        </div>
                        <div className='flex flex-col gap-4 w-[293px]'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="your-name" className='text-white font-bold'>Seu Nome</label>
                                <TextInput id='your-name' placeholder='Seu Nome' value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="your-description">Descrição</label>
                                <TextArea placeholder='Fale um pouco sobre você' className='h-36' id='your-description' value={profileDescription} onChange={(e) => setProfileDescription(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4 justify-end'>
                        <button className='font-bold text-white' onClick={() => setIsModalOpen(false)}>Voltar</button>
                        <Button onClick={handleSaveProfile} disabled={isSaving}>
                            Salvar
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
