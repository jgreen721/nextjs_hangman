import React from 'react'
import {motion} from "framer-motion"
import "./reusables.css"

const GameCard:React.FC<any> = ({children}) => {
  return (
    <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",delay:.25}} className="play-card shadow-light-shadow">
        <div className="play-card-bg"></div>
        <div className="play-card-content">
            {children}
        </div>
    </motion.div>
  )
}

export default GameCard