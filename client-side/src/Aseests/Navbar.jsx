import React from 'react'
import logo from '../data/Suivi.Series.logo.svg'
import {PrimaryButtons, SecondaryButtons} from './Buttons'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className=' flex flex-row justify-between items-center'>
        <Link to="/">
            <img src={logo} alt="" />
        </Link>
        <div className='flex flex-row gap-2'>
            <Link to="connecter">
              <SecondaryButtons text="S'inscrire"/>
            </Link>
            <Link to="inscrire">
              <PrimaryButtons text='Se connecter'/>
            </Link>
        </div>
    </div>
  )
}

export default Navbar