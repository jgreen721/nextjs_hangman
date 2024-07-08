import React from 'react'
import { GameCard,GradientBtn,Btn } from '@/reusables'
import {motion} from "framer-motion"
import Image from "next/image"
import "../components_styles.css"


const StartScreen:React.FC<any> = ({page,handleChangePage}) => {

  const startGame=()=>{
    console.log("start game!")
    handleChangePage(4)
  }

  const showInstructions=()=>{
    console.log("show instructions!")
    handleChangePage(2)
  }

  return (
    <motion.div initial={{translateX:0}} transition={{type:"spring",duration:2}} exit={{translateX:'100%'}} className="view-container items-center">
        <GameCard>
          <div className="relative h-full w-full flex justify-center flex-col items-center">
            <motion.div initial={{translateY:-50,scaleX:0}} animate={{translateY:0,scaleX:1}} transition={{type:"spring",delay:.75}} className="absolute w-full h-full -top-[65%]">
              <Image src="./images/logo.svg" fill alt="img"/>
           </motion.div>
              <GradientBtn handlePress={startGame} size={200} img="./images/icon-play.svg"/>
            <div className="mt-10">
              <Btn handlePress={showInstructions} color="bg-blue-500" text="How to Play"/>
            </div>
          </div>
        </GameCard>
    </motion.div>
  )
}

export default StartScreen