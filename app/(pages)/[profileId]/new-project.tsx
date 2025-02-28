"use client";
import Button from '@/app/components/ui/button';
import Modal from '@/app/components/ui/modal'
import TextArea from '@/app/components/ui/text-area';
import TextInput from '@/app/components/ui/text-input';
import { ArrowUpFromLine, Plus } from 'lucide-react'
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
                <div className='bg-background-primary p-8 rouded-[20px] flex flex-col justify-between gap-10'>
                    <p className='text-white font-bold text-xl'>
                        Novo Projeto
                    </p>
                    <div className='flex gap-10'>
                        <div className='flex flex-col items-center gap-3 text-xs'>
                            <div className='w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden'>
                                <button className='w-full h-full'>
                                    100x100
                                </button>
                            </div>
                            <button className='text-white flex items-center gap-2'>
                                <ArrowUpFromLine className='size-4' />
                                <span>Adicionar Imagem</span>
                            </button>
                            <input type="file" name="" id="image-input" accept='image/*' className='hidden' />
                        </div>
                        <div className='flex flex-col gap-4 w-[293px]'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='project-name' className='text-white font-bold'>
                                    Titulo do projeto
                                </label>
                                <TextInput id='project-name' placeholder='Digite o nome do projeto' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-white font-bold'>
                                    Descrição
                                </label>
                                <TextArea id='project-description' placeholder='Uma descrição para o projeto' className='h-36' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-white font-bold'>
                                    Url do Projeto
                                </label>  
                                <TextInput type='url' id='project-url' placeholder='Digite URL' />
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 justify-end'>
                        <button className='font-bold text-white'>Voltar</button>
                        <Button>
                            Salvar
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
