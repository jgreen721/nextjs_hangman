"use client";
import {useState,useRef, useEffect} from "react";
import { BgOverlay,StartScreen,Instructions,Categories,Game } from "@/components";
import Template from "./template"
import {motion} from "framer-motion"
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeMute } from "react-icons/fa";



const AudioBtn = ({audioRef}:any)=>{
  const [isPlaying,setIsPlaying] = useState(false);


  return(
  <button onClick={()=>{
    console.log("btnClicked")
    if(!isPlaying){
    audioRef.current.play()
    setIsPlaying(true);
    }
    else{
      audioRef.current.pause()
      setIsPlaying(false);

    }

  }} className="absolute z-1000 right-5 top-5 text-3xl">
      {!isPlaying ? 
      <FaVolumeMute color="white" />
          :
      <FaVolumeHigh color="white"/>
    }
    </button>
  )
}


export default function Home() {
  const [page,setPage] = useState(1)
  const [category,setCategory] = useState("Movies");
  const [width,setWidth] = useState<any>(null);
  const audioRef = useRef<any>();
  // 1 == StartScreen
  // 2 == Instructions
  // 3 == Categories
  // 4 == Game

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  };

  useEffect(()=>{
    setWidth(window.innerWidth)
  },[]);



  const handleChangePage = (pageNum:number)=>{
    console.log("pageNum",pageNum);
    setPage(pageNum)
    playAudio();
  }
  return (
    <motion.main initial={{translateY:'0%'}} animate={{translateY:0}} transition={{type:"spring"}} className="main-container">
    {/* <main className="main-container"> */}

      <BgOverlay/>
    
        <Template key={page}> 
            {page == 1 &&   <StartScreen page={page}  handleChangePage={handleChangePage}/>}
            {page == 2 &&   <Instructions page={page} width={width} handleChangePage={handleChangePage}/>}
            {page == 3 &&   <Categories setCategory={setCategory} width={width} page={page} handleChangePage={handleChangePage}/>}
            {page == 4 &&   <Game category={category} width={width} page={page} handleChangePage={handleChangePage}/>}
       </Template>

       <audio ref={audioRef as any} loop={true} id="audioPlayer" className="w-100 absolute hidden" controls src="/gameaudio.mp3">
        Your browser does not support the audio element.
      </audio>
      <AudioBtn audioRef={audioRef}/>



 
    {/* </main> */}
     </motion.main>
  );
}
