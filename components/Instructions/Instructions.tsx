import React from 'react'
import "../components_styles.css"
import {Header,GradientBtn} from "@/reusables"
import {motion} from "framer-motion"


const InstructionCard = ({instruction,delay}:any)=>{


  return (
<motion.li initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",delay:delay}} className="flex items-center lg:flex-col gap-10 md:gap-4 text-center bg-white p-6 rounded-[40px] flex-1 h-full instructions-shadow">
    <h1 className="hidden md:block text-8xl text-custom-blue">{String(instruction.id).padStart(2,'0')}</h1>
    <div className="text-start md:text-center">
      <h3 className="text-2xl md:text-5xl lg:my-10 text-custom-darkpurple uppercase"><span className="text-custom-blue mr-5 md:hidden">{String(instruction.id).padStart(2,'0')}</span>{instruction.title}</h3>
      <h5 className="text-md md:text-2xl lg:text-3xl text-custom-purple max-w-[600px]">{instruction.blurb}</h5>
    </div>
</motion.li>
  )
}

const Instructions:React.FC<any> = ({page,handleChangePage,width}) => {
  const instructions = [
    {id:1,title:"Choose a Category",delay:".5",blurb:"First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word."},
    {id:2,title:"Guess Letters",delay:".75",blurb:"Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it's wrong, you lose some health, which empties after eight incorrect guesses."},
    {id:3,title:"Win or Lose",delay:"1",blurb:"You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose."},
  ]
  return (
    <div className={`view-container`}>
      <div className="flex justify-between items-center md:justify-start w-full  relative">
          <GradientBtn img="images/icon-back.svg" size={width > 750 ? 94 : 64} imgSize={width > 750 ? 45 : 35} handlePress={()=>handleChangePage(1)}/>
        <div className="md:absolute md:w-full text-center">
          <Header>Instructions</Header>
        </div>
      </div>
      <ul className="flex items-center justify-center flex-col lg:flex-row gap-5 my-12">
        {instructions.map(instruction=>(
          <InstructionCard key={instruction.id} delay={instruction.delay} instruction={instruction}/>
        ))}
      </ul>
    </div>
  )
}

export default Instructions