import React from 'react'
import "./BgOverlay.css"

const BgOverlay = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden">
        <div className="carousel absolute h-full w-full">
        <div className="absolute h-full w-full min-h-screen carousel-bg">
            {/* <Image src="./images/background-desktop.svg" height={300} width={300} layout="responsive"/> */}
        </div>
        <div className="absolute h-full w-full min-h-screen carousel-bg rotate-carousel-bg">
            {/* <Image className="rotate-img" src="./images/background-desktop.svg" height={300} width={300} layout="responsive"/> */}
        </div>
        <div className="absolute h-full w-full translate-x-[199.5%] min-h-screen carousel-bg">
            {/* <Image src="./images/background-desktop.svg" height={300} width={300} layout="responsive"/> */}

        </div>
        </div>
    </div>
  )
}

export default BgOverlay