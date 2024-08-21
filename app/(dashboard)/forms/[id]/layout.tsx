import React, { ReactNode } from 'react'

function layout({children}: {children: ReactNode}) {
  return (
    <div className='w-full min-h-screen flex-grow mx-auto'>
        {children}
    </div>
  )
}

export default layout