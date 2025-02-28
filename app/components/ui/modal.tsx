"use client";
import useOnClickOutside from '@/app/hooks/useOnClickOutSide';
import React, { RefObject, useRef } from 'react'

export default function Modal({
    children,
    isOpen,
    setOpen
}: {
    children: React.ReactNode,
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void
 }) {

    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref as React.RefObject<HTMLDivElement>, () => { 
        setOpen(false)
    })

    if(!isOpen) return null

    return (
        <div className='fixed inset-0 bg-[#787878]/10 flex items-center justify-center backdrop:blur-md z-50'>
            <div ref={ref}>
                {children}
            </div>
        </div>
    )
}
