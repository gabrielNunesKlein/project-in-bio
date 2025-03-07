import Header from '@/app/components/leadingPage/header'
import Button from '@/app/components/ui/button'
import TextInput from '@/app/components/ui/text-input'
import { Rocket } from 'lucide-react'
import React from 'react'
import CreateLinkForm from './create-link-form'
import { trackServerEvent } from '@/app/lib/mixpanel'

export default function CriarPagina() {

  trackServerEvent("page_view", {
    page: "home",
  });

  return (
    <div>
        <Header />
        <div className='h-screen flex flex-col gap-10 items-center justify-center max-w-xl mx-auto'>
            <div className='flex items-center gap-4'>
                <h1 className='text-4xl font-bold text-white'>Escolha seu link</h1>
                <Rocket className='size-16' />
            </div>
            <CreateLinkForm />
        </div>
    </div>
  )
}
