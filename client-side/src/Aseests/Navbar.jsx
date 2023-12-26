import React from 'react'
import logo from '../data/Suivi.Series.logo.svg'
import {PrimaryButtons, SecondaryButtons} from './Buttons'
const Navbar = () => {
  return (
    <div className=' flex flex-row justify-between items-center'>
        <div className="logo">
            <img src={logo} alt="" />
        </div>
        <div className='flex flex-row gap-2'>
            <SecondaryButtons text="S'inscrire"/>
            <PrimaryButtons text='Se connecter'/>
        </div>
    </div>
  )
}

export default Navbar