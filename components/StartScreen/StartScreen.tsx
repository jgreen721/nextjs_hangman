import React from 'react'
import { GameCard,GradientBtn,Btn } from '@/reusables'
import {motion} from "framer-motion"
import Image from "next/image"
import "../components_styles.css"


const StartScreen:React.FC<any> = ({page,handleChangePage}) => {

  const startGame=()=>{
    console.log("start game -- direct to categories")
    handleChangePage(3)
  }

  const showInstructions=()=>{
    console.log("show instructions!")
    handleChangePage(2)
  }

  return (
    <div className={`view-container items-center justify-center`}>
        <GameCard>
          <div className="relative h-full w-full flex justify-center flex-col items-center">
            <motion.div initial={{translateY:-50,scaleX:0}} animate={{translateY:0,scaleX:1}} transition={{type:"spring",delay:.75}} className="absolute w-full h-full -top-[80%] flex items-center justify-center">
              <Image src="./images/logo.svg" width={300} height={200} alt="img"/>
           </motion.div>
              <GradientBtn handlePress={startGame} size={200} imgSize={65} img="./images/icon-play.svg"/>
            <div className="mt-10">
              <Btn handlePress={showInstructions} color="bg-blue-500" text="How to Play"/>
            </div>
          </div>
        </GameCard>
    </div>
  )
}

export default StartScreen