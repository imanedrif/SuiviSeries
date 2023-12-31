import React, { useState } from 'react'
import Heart from '../data/heartIcon.svg'
import FilledHeart from '../data/heartFilled.svg'
import { Navigate } from 'react-router-dom'

export const Card = (props) => {
  // const [isHovered, setIsHovered] = useState(false)
  const [isClicked,SetIsclicked] = useState(false)

  const handleClick = ()=>{
    SetIsclicked(true)
    
    // add to favories traitement
  }
  
  return (
    <div className="relative rounded-lg w-80 h-[500px] border border-indigo-500 group hover:cursor-pointer" style={{
      background: `url(${props.image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: 'cover'
    }}
    onClick={()=>{
    window.open(`/serie/${props.id}`,'_self')
    }}
    >
      <div className='inset-0 absolute hidden group-hover:block bg-black bg-opacity-40 text-white rounded-lg'>
      <div className=' py-2 px-2 flex flex-col items-start gap-16'>
        <div className='flex flex-col items-start gap-1'>
          <button className='rounded-full font-bold bg-white bg-opacity-15 py-2 px-4'>{props.releaseDate}</button>
          <div className='flex items-center pl-2 gap-1'>
            {Array.from({ length: props.rating }).map((_, index) => (
              <span key={index} className='text-yellow-500'>
                ★
              </span>
            ))}
          </div>
        </div>
        <div className='flex flex-col items-start gap-10'>
          <p className=' font-light text-justify text-sm'>{props.description}</p>
          <div className='flex flex-row  gap-3 items-baseline bottom-3 absolute'>
            <div className=' bg-slate-300 w-64 h-[1px]'></div>
            {isClicked ? 
            <img src={FilledHeart} alt="" onClick={()=>SetIsclicked(false)} className=' cursor-pointer h-5'/>
            :
            <img src={Heart} alt="" onClick={handleClick} className=' cursor-pointer h-5'/>
            }
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}