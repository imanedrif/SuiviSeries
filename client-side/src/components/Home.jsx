import React from 'react'
import { PrimaryButtonsIcon } from '../Aseests/Buttons'
import FilterIcon from '../data/filtre-icon.svg'
import { Card } from '../Aseests/Cards'
import serie from '../data/serie2.jpg'
import Left from '../data/ChevronLeftOutline.svg'
import Right from '../data/ChevronRightOutline.svg'
import axios from 'axios'

const Home = () => {

  // fetch data from Api
  try {
    const ApiKey = "5bf89b1ac4dec1f2a3dacb6b4b926527"
    
  }



  return (
    <div className=' container m-auto flex flex-col items-center justify-center mt-24 gap-8'>
      <div className='flex flex-row gap-4 items-center z-[1]'>
        <h2 className='text-white text-2xl font-medium'>Liste séries</h2>
        <div className='bg-slate-50 xl:w-[910px] md:w-[400px] md-auto h-[1px]'></div>
        <PrimaryButtonsIcon text='Filtre' iconRight={FilterIcon} />
      </div>
      <div className='relative'>
        <div className='relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 z-10'>
          <Card image={serie} releaseDate="2023-01-01" rating={5} description="Your card description here..." />
          <Card image={serie} releaseDate="2023-01-01" rating={5} description="Your card description here..." />
          <Card image={serie} releaseDate="2023-01-01" rating={5} description="Your card description here..." />
          <Card image={serie} releaseDate="2023-01-01" rating={5} description="Your card description here..." />
          <Card image={serie} releaseDate="2023-01-01" rating={5} description="Your card description here..." />
          <Card image={serie} releaseDate="2023-01-01" rating={5} description="Your card description here..." />
          <Card image={serie} releaseDate="2023-01-01" rating={5} description="Your card description here..." />
          <Card image={serie} releaseDate="2023-01-01" rating={5} description="Your card description here..." />
          <Card image={serie} releaseDate="2023-01-01" rating={5} description="Your card description here..." />
          <Card image={serie} releaseDate="2023-01-01" rating={5} description="Your card description here..." />
        </div>
        {/* Background overlay with absolute positioning */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 opacity-75 filter blur-3xl"></div>
      </div>
      <div className='flex gap-7'>
        <img src={Left} alt="" />
        <img src={Right} alt="" />
      </div>
    </div>
  )
}

export default Home