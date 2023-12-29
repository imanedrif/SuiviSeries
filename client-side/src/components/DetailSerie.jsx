import React, { useState } from 'react'
import serie from '../data/serie2.jpg'
import { useParams } from 'react-router-dom'
import { SecondaryButtons } from '../Aseests/Buttons'
import Check from '../data/CheckCircle.svg'

const DetailSerie = () => {
  const {id} = useParams()
  const [details,setDetails] = useState(null)
  const Eps = ["Ep1","Ep2","Ep3","Ep4","Ep5"]
  // console.log(id)
  // fetch('wwwjojoojoj/id').then((res)=>{
  //   setDetails(res.data)
  // })
  return (
    <div className='container m-auto p-4 gap-10 flex flex-col items-center justify-center h-full mt-8 text-white'>
        <div className='flex gap-6 flex-col items-center p-4 lg:flex-row md:p-8 bg-neutral-200 bg-opacity-10 rounded-lg container m-auto md:gap-14'>
          <img src={serie} alt=""  className='w-[419px] rounded-xl'/>
          <div className='flex flex-col gap-5 items-center md:items-start md:gap-11'>
            <div className='flex flex-col gap-6 md:gap-1 w-full'>
              <div className='flex flex-col gap-1 md:flex-row items-center md:gap-4'>
                <h1 className=' text-4xl font-bold'>AVENGERS</h1>
                <div className='border w-full'></div>
              </div>
              <div className='flex flex-row items-center justify-center md:justify-start gap-10 md:gap-10'>
                <h3 className=' font-light'>Année de production : <span className=' font-bold'>2012</span></h3>
                <h3 className=' font-light'>Pays :<span className=' font-bold'>USA</span></h3>
                <h3 className=' font-light'>Saisons:<span className=' font-bold'>2</span></h3>
              </div>
            </div>
            <div className='border w-fit p-3 rounded text-yellow-500 border-yellow-500'><span className='font-bold'>7.70</span></div>
            <div className='flex flex-col items-center md:items-start gap-1'>
              <h2 className='text-xl font-medium'>Description :</h2>
              <p className='font-light md:text-sm text-xs text-center md:text-left'>Lorsque la sécurité et l’équilibre de la planète sont menacés par un ennemi d’un genre nouveau, Nick Fury, le directeur du SHIELD, l’agence internationale du maintien de la paix, réunit une équipe pour empêcher le monde de basculer dans le chaos. Partout sur Terre, le recrutement des nouveaux héros dont le monde a besoin commence…Un film Génial en streaming gratuit ! Tant de superlatifs mérités pour ce film très réussi. Avengers est sorti, en United States of America, en 2012, dans la catégorie Science-Fiction. Une réalisation de la part de réalisateur inconnu avec la participation dynamique de Robert Downey Jr. et Chris Evans qui ont perfectionné leur jeux de rôle dans la plupart des scènes du film dans lequel on les voit briller. Le film Avengers dure environ 142 minutes et a reçu une note de 7.70/10 avec plus de 24525 votes</p>
            </div>
            <div className='flex flex-row gap-6'>
              <SecondaryButtons text="Saison 1"/>
              <SecondaryButtons text="Saison 2"/>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-4 lg:grid-cols-10 bg-zinc-300 bg-opacity-10 container m-auto p-6 gap-6 items-start justify-start rounded-lg'>
          {Eps.map((ep)=>{
            return(
              <div className=' flex flex-col px-6 py-3 items-center justify-start bg-purple-900 bg-opacity-20 border-2 border-purple-900 rounded-md'>
                <span className='font-bold text-lg'>{ep}</span>
                <img src={Check} alt="" />
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default DetailSerie