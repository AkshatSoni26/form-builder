"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ImShare } from 'react-icons/im'
import { toast } from './ui/use-toast'

function FormLinkShare({shareURL}:{shareURL: string}) {

    const [mounted, setMounted] = useState(false)

    const shareLink = `${window?.location.origin}/submit/${shareURL}`

    useEffect(
        () => {
            setMounted(true)
        }, []
    )

    if(!mounted) {
        return null // avoiding window not defiend error 
    }

  return (
    <div className='flex flex-grow gap-4 items-center'>
        <Input value={shareLink} readOnly/>
        <Button
        className='max-w-[250px]'
        onClick={() => {
            navigator.clipboard.writeText(shareLink)
            toast({
                title:"Copid!",
                description:"Link copid to clipboard"
            })
        }}
        >
            <ImShare className='mr-2 h-4 w-4' />
            Share link
        </Button>
    </div>
  )
}

export default FormLinkShare