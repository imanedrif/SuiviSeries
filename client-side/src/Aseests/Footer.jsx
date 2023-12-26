import React from 'react'

export const Footer = () => {
    return (
      <div className='flex flex-col items-center justify-center gap-1 absolute bottom-0 left-0 right-0'>
        <div className=' h-[1px] bg-slate-300 w-screen'></div>
        <p className=' text-white text-sm font-extralight'>© 2023 Suivi Series Tous droits réservés.</p>
      </div>
    )
  }