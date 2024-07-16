import React from 'react'
import "./reusables.css"

const Header = ({children,isHeader}:any) => {
  return (
    <div className="relative">
    <h1 className={`${isHeader ? 'text-4xl' : 'text-8xl'} md:text-6xl lg:text-8xl absolute top-0 text-transparent customshadow w-full`}>{children}</h1>
    <h1 className={`${isHeader ? 'text-4xl' : 'text-8xl'} md:text-6xl lg:text-8xl relative text-transparent bg-clip-text bg-bluewhitegradient`}>{children}</h1>
    </div>
  )
}

export default Header