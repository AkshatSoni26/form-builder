"use client"

import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Moon, Sun } from "lucide-react"


function ThemSwitcher() {

    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)



    useEffect(
        () => {
            setMounted(true)
        }, [theme]
    )

    if (!mounted) return null

    return (
        <Tabs defaultValue={theme}>
            <TabsList className='border'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TabsList>
            <TabsList className='border'>
                <TabsTrigger value='light' onClick={() => setTheme("light")}>
                    <DesktopIcon className='h-[1.2rem] w-[1.2rem]' />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default ThemSwitcher