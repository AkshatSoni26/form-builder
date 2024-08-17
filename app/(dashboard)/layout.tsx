import Logo from '@/components/Logo'
import ThemSwitcher from '@/components/ThemSwitcher'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React, { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-background max-h-screen'>
      <nav className='flex justify-between items-center border-b border-border h-[60px] px-4 py-2'>
        <Logo />
        <div className='flex gap-4 items-center'>
          <ThemSwitcher />
          <UserButton />
        </div>
      </nav>
      {/* <main className="flex w-full flex-grow"> */}
      <main className='p-4'>
      {children}
      </main>
    </div>
  )
}

export default Layout