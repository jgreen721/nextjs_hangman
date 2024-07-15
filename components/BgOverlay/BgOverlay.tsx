import React from 'react'
import "./BgOverlay.css"

const BgOverlay = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden">
        <div className="carousel absolute h-full w-full">
        <div className="absolute h-full w-full min-h-screen carousel-bg"></div>
        <div className="absolute h-full w-full min-h-screen carousel-bg rotate-carousel-bg"></div>
        <div className="absolute h-full w-full translate-x-[199.5%] min-h-screen carousel-bg">

        </div>
        </div>
    </div>
  )
}

export default BgOverlay