"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

function VisitBtn({shareURL}:{shareURL: string}) {

    const [mounted, setMounted] = useState(false)

    if (typeof window !== 'undefined') {
    var shareLink = `${window?.location.origin}/submit/${shareURL}`
    }

    useEffect(
        () => {
            setMounted(true)
        }, []
    )

    if(!mounted) {
        return null // avoiding window not defiend error 
    }

  return (
    <Button className='w-[200px]' onClick={() => {
        if (typeof window !== 'undefined') {
        window?.open(shareLink, "_blank")
        }
    }}>
        Visit
    </Button>
  )
}

export default VisitBtn