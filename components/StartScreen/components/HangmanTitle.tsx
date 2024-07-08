import React from 'react'


const HangmanTitle = () => {
  return (
    <div className="border-4 border-red-500 w-full items-center justify-center flex flex-col">
      <h3 className="text-2xl">The</h3>
      <div className="relative flex items-center justify-center">
      <h1 className="text-8xl absolute custom-header-shadow">Hangman</h1>
      <h1  className="text-8xl relative z-10 border-2 border-white text-transparent bg-clip-text bg-bluewhitegradient">Hangman</h1>
      </div>
      <h3 className="text-2xl">Game</h3>
    </div>
  )
}

export default HangmanTitle