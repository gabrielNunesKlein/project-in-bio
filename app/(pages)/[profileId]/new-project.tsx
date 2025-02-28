"use client";
import Modal from '@/app/components/ui/modal'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

export default function NewProject({ profileId }: { profileId: string}) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <button onClick={() => setOpen(true)} className='w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center hover:border border-dashed'>
                <Plus className='size-10 text-accent-green' />
                <span >Novo projeto</span>
            </button>

            <Modal isOpen={open} setOpen={setOpen}>
                Teste
            </Modal>
        </>
    )
}
