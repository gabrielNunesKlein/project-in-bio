"use client"

import Button from '@/app/components/ui/button'
import { useStripe } from '@/app/hooks/useStripe'
import { useParams } from 'next/navigation'
import React from 'react'

export default function PlanButtons() {
    
    const { createStripeCheckout } = useStripe()
    const { profileId } = useParams()

    return (
        <div className='flex gap-4'>
            <Button onClick={() => createStripeCheckout({ metadata: { profileId }, isSubscription: true}) }>
                R$ 9,90 / mês
            </Button>
            <Button>R$ 99,90 Vitalicio</Button>
        </div>
    )
}
