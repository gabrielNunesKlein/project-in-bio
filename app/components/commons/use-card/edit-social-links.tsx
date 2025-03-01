"use client"

import { Github, Instagram, Linkedin, Plus, Twitter } from 'lucide-react'
import React, { startTransition, useState } from 'react'
import Modal from '../../ui/modal'
import Button from '../../ui/button'
import { useParams, useRouter } from 'next/navigation'
import { createSocialLinks } from '@/app/actions/create-social-links'
import TextInput from '../../ui/text-input'

export default function EditSocilaLinks({ socialMedia }: { 
    socialMedia: {
        github: string;
        instagram: string;
        linkedin: string;
        twitter: string;
    }
}) {
    const [modalOpen, setModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const router = useRouter()

    const [github, setGithub] = useState(socialMedia.github || "");
    const [instagram, setInstagram] = useState(socialMedia.instagram || "");
    const [linkedin, setLinkedin] = useState(socialMedia.twitter || "");
    const [twitter, setTwitter] = useState(socialMedia.twitter || "");

    const { profileId } = useParams()

    const handleAddSocialLinks = async () => {
        setIsSaving(true)

        if(!profileId) return;

        await createSocialLinks({
            profileId: profileId as string,
            github,
            instagram,
            linkedin,
            twitter
        })

        startTransition(() => {
            setIsSaving(false)
            setModalOpen(false)
            router.refresh()
        })

    }

    return (
        <>
            <button className='p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]' onClick={() => setModalOpen(true)}>
                <Plus />
            </button>

            <Modal isOpen={modalOpen} setOpen={setModalOpen}>
                <div className='bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]'>
                    <p className='text-white font-bold text-xl'>Adicionar redes sociais</p>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2 w-full'>
                            <Github />
                            <TextInput type="text" placeholder='Link GitHub' value={github} onChange={(e) => setGithub(e.target.value)} />
                        </div>
                        <div className='flex items-center gap-2 w-full'>
                            <Linkedin />
                            <TextInput type="text" placeholder='Link Linkedin' value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                        </div>
                        <div className='flex items-center gap-2 w-full'>
                            <Instagram />
                            <TextInput type="text" placeholder='Link Instagram' value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                        </div>
                        <div className='flex items-center gap-2 w-full'>
                            <Twitter />
                            <TextInput type="text" placeholder='Link Twitter' value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                        </div>
                    </div>

                    <div className='flex gap-4 justify-end'>
                        <button className='font-bold text-white' onClick={() => setModalOpen(false)}>Voltar</button>
                        <Button onClick={handleAddSocialLinks} disabled={isSaving}>
                            Salvar
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
