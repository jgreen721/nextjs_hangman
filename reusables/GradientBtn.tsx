"use client"
import React, {useState} from 'react'
import Image from "next/image"


const GradientBtn:React.FC<any> = ({img,size,handlePress}) => {
            const [hover,setHover] = useState(false)
    let sizes:any ={
        200:"w-[200px] h-[200px]"
    }
  return (
    <button onClick={handlePress} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} className={`rounded-full ${sizes[size]} relative flex items-center justify-center transition ease-in`}>
        <div className={`absolute w-full h-full flex items-center justify-center bg-btn-gradient rounded-full z-50 transition duration-2 ${hover ? 'scale-[1.05] shadow-inner-card' : 'scale-[1]'}`}>
            <Image src={img} height={65} width={65} alt="img"/>
        </div>
        <div className={`absolute w-full h-full rounded-full bg-purple-800 z-5 transition duration-2 top-2 ${hover ? 'scale-[.99] shadow-btn-shadow' : 'scale-[1]'}`}></div>
        {/* <h1 className="text-5xl">START</h1> */}
        {/* <div className={`absolute transition duration-2 h-[100%] ${!hover ? 'top-[5px]' : 'top-[15px]'} w-full rounded-full bg-dark-gray`}></div>
        <div className={`absolute w-full h-full bg-btn-gradient transition ${hover ? 'blur-[20px]' : 'blur-[2px]'} rounded-full`}></div> */}
    </button>
  )
}

export default GradientBtn