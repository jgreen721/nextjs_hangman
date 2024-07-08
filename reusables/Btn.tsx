import React, {useState} from 'react'

const Btn:React.FC<any> = ({text,color,handlePress}) => {
    const [hover,setHover] = useState(false)
  return (
    <button onClick={handlePress} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} className={`rounded-full relative transition ease-out`}>
        <div className={`absolute inset-0 w-full h-full rounded-full bg-blue-800 transition ${hover ? '-top-[2px] translate-x-[4px] -translate-y-[2px]' : '-top-[4px]'}`}></div>
        <div className={`relative w-full h-full px-12 py-2 rounded-full bg-blue-700 transition ${hover ? 'scale-[1.03] shadow-btn-inset-bottom' : 'scale-[1]'}`}>
            <h5 className="text-3xl text-white tracking-custom-spacing custom-shadow">{text}</h5>
        </div>
    </button>
  )
}

export default Btn