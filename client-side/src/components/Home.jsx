import React, { useEffect, useState } from 'react'
import { PrimaryButtonsIcon } from '../Aseests/Buttons'
import FilterIcon from '../data/filtre-icon.svg'
import { Card } from '../Aseests/Cards'
import serie from '../data/serie2.jpg'
import Left from '../data/ChevronLeftOutline.svg'
import Right from '../data/ChevronRightOutline.svg'
import axios from 'axios'

const Home = () => {

const [series,setSeries]=useState([]);

useEffect(()=>{
  getTrendingSerieData()
  console.log(series)
},[]);

async function getTrendingSerieData(){
  try {
    // const ApiKey = "5bf89b1ac4dec1f2a3dacb6b4b926527"
    let resp=await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=5bf89b1ac4dec1f2a3dacb6b4b926527`)
    /*console.log(resp.data.results);*/
    setSeries(resp.data.results);
    console.log(series)
  }catch(e){
    console.log(e)
  }finally{

  }
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
            {series.map((serie,i)=>(
              <Card serie={serie} />
            ))}
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