"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

function VisitBtn({shareURL}:{shareURL: string}) {

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
    <Button className='w-[200px]' onClick={() => {
        window?.open(shareLink, "_blank")
    }}>
        Visit
    </Button>
  )
}

export default VisitBtn