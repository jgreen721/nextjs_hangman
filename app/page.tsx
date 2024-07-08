"use client";
import {useState} from "react";
import { BgOverlay,StartScreen,Instructions,Categories,Game } from "@/components";
import {AnimatePresence, motion} from "framer-motion"


export default function Home() {
  const [page,setPage] = useState(1)
  // 1 == StartScreen
  // 2 == Instructions
  // 3 == Categories
  // 4 == Game


  const handleChangePage = (pageNum:number)=>{
    console.log("pageNum",pageNum);
    setPage(pageNum)
  }
  return (
    <motion.main initial={{translateY:'-100%'}} animate={{translateY:0}} transition={{type:"spring"}} className="main-container">
      <BgOverlay/>
      <AnimatePresence key={page}/>
      <div className="absolute z-50 w-full h-full flex justify-center">
        {page == 1 && <StartScreen page={page} handleChangePage={handleChangePage}/>}
        {page == 2 && <Instructions page={page} handleChangePage={handleChangePage}/>}
        {page == 3 && <Categories page={page} handleChangePage={handleChangePage}/>}
        {page == 4 && <Game page={page} handleChangePage={handleChangePage}/>}
      </div>
      <h2 className="text-5xl text-white absolute ">Hello Sexy</h2>

    </motion.main>
  );
}
