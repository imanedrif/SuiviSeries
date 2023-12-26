import React from 'react'
import { PrimaryButtonsIcon } from '../Aseests/Buttons'
import FilterIcon from '../data/filtre-icon.svg'
import { Card } from '../Aseests/Cards'
import serie from '../data/serie2.jpg'
import Left from '../data/ChevronLeftOutline.svg'
import Right from '../data/ChevronRightOutline.svg'

const Home = () => {

  // fetch data from Api

  return (
    <div className='flex flex-col items-center justify-center mt-24 gap-8'>
        <div className='flex flex-row gap-4 items-center'>
          <h2 className='text-white text-2xl font-medium'>Liste séries</h2>
          <div className='bg-slate-50 xl:w-[910px] md:w-[400px] md-auto h-[1px]'></div>
          <PrimaryButtonsIcon text='Filtre' iconRight={FilterIcon}/>
        </div>
        <div className='flex flex-wrap gap-5 justify-center'>
          <Card image={serie} title="Your Title" releaseDate="2023-01-01" rating={5} description="Lorsque Nick Fury, le directeur du S.H.I.E.L.D., l'organisation qui préserve la paix au plan mondial, cherche à former une équipe de choc pour empêcher la destruction du monde, Iron Man, Hulk, Thor, Captain America, Hawkeye et Black Widow répondent présents ...."/>
          {/* use map to display series and put each info in its place */}
        </div>
        <div className='flex gap-7'>
          <img src={Left} alt="" />
          <img src={Right} alt="" />
        </div>
    </div>
  )
}

export default Home