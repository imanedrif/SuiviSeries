import React from 'react'
import { PrimaryButtons } from '../Aseests/Buttons'
import { Link } from 'react-router-dom'
import vector1 from '../data/Vector 1.svg'

const Login = () => {
  return (<>
    <div className='container m-auto flex flex-col items-center justify-center min-h-screen gap-16 relative text-white z-[1]'>
      <div className='flex items-center gap-6'>
        <div className=' h-[1px] w-[198px] bg-slate-300'></div>
        <p className=' font-semibold text-3xl tracking-wide'>S’authentifier</p>
        <div className=' h-[1px] w-[198px] bg-slate-300'></div>
      </div>
      <div className='flex flex-col gap-8 w-3/4 max-w-[600px] '>
        <div className='flex flex-col items-start gap-3'>
          <p className=' text-xl font-medium'>Nom d’utilisateur :</p>
          <input type="text" placeholder='Entrer  votre nom d’utilisateur' className=' font-thin text-gray-500 py-5 px-6 w-full rounded-md' />
        </div>
        <div className='flex flex-col items-start gap-3'>
          <p className=' text-xl font-medium'>Mot de passe :</p>
          <input type="text" placeholder='Entrer  votre nom d’utilisateur' className=' font-thin text-gray-500 py-5 px-6 w-full rounded-md' />
        </div>
        <div className='-mt-4'>
          <span className=' font-thin opacity-60'>si vous n’avez pas un compte veuillez </span>
          <Link to="/inscrire">
            <span className='text-red font-bold'>s’inscrire</span>
          </Link>
        </div>
        <PrimaryButtons text="Se connecter" />
      </div>
    </div>
    <img src={vector1} alt="" className='absolute w-full right-0 h-screen inset-0 z-0' />
  </>

  )
}

export default Login