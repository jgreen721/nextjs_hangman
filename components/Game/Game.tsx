"use client"
import React, {useEffect,useState,useRef} from 'react'
import "../components_styles.css"
import { GradientBtn,GameCard,Header,Btn } from '@/reusables'
import {motion} from "framer-motion"
import Image from "next/image"
import CountUp from "react-countup"

const LetterBtn = ({letter,handleChooseLetter}:any)=>{
  const [active,setActive] = useState(false);

  return (
<button onMouseEnter={()=>{
  if(letter.isPressed)return;
  setActive(true);

}}
onMouseLeave={()=>{
  if(letter.isPressed)return;
  setActive(false);

}}

disabled={letter.isPressed} onClick={()=>handleChooseLetter(letter.letter)} className="relative text-xl md:text-4xl text-custom-darkpurple min-w-[35px] min-h-[35px]">
  <div className={`absolute z-20 ${letter.isPressed ? 'bg-white opacity-75' : 'bg-white'} w-full h-full top-0 rounded-[14px]`}></div>
  <div className={`absolute w-full h-full bg-purple-500 top-[2px] rounded-[14px] transition ease-in duration-1 ${active ? 'shadow-btn-shadow scale-[1.02]' : 'shadow-btn-inset scale-[1]'}`}></div>
  <div className="relative z-30 flex items-center justify-center p-2">
    <h5 className="text-xl md:text-4xl text-custom-darkpurple">{letter.letter}</h5>
  </div>
</button>
  )
}


const LetterPanel = ({letter,delay,isSelected}:any)=>{

  return (
    <motion.div initial={{translateY:"-50px",scaleY:0}} animate={{translateY:0,scaleY:1}} transition={{type:"spring",delay}} style={{"--i":`${delay}s`} as any} className={`${isSelected ? 'animate-panel' : ''} w-[50px] h-[50px] md:w-[100px] md:h-[100px] flex items-center justify-center rounded-[25%] border-b-4 shadow-md border-black relative`}>
      <div className="absolute w-full h-full bg-blue-400 rounded-[25%] -top-1"></div>
      <div className="absolute w-full h-full bg-blue-500 rounded-[25%] shadow-category-card-inset"></div>
      <h1 className={`text-3xl md:text-8xl text-white uppercase transition duration-1 ease-in ${isSelected ? 'animate-correct-letter' : 'opacity-0'}`}>{letter}</h1>

    </motion.div>
  )
}


const GameScreen = ({topBtnText,header,gameState,renderValue,handleChangePage,setGameState}:any)=>{
  // console.log(gameState,renderValue)

  return(
    <div className={`${gameState == renderValue ? 'translate-y-0' : 'translate-y-[100%]'} transition ease-in absolute w-full h-full flex items-center justify-center z-[1000]`}>
    <GameCard>
      <div className="relative h-full w-full flex justify-center flex-col items-center">
        <motion.div initial={{translateY:-50,scaleX:0}} animate={{translateY:0,scaleX:1}} transition={{type:"spring",delay:.75}} className="absolute w-full h-full -top-[70%] flex items-center justify-center">
       <Header>{header}</Header>
       </motion.div>
        <div className="mt-10 flex flex-col gap-4">
           <Btn handlePress={()=>{
             if(gameState == "pause"){
             setGameState(null)}
             else{
              setGameState("reset")

             }
             }} color="bg-blue-500" text={topBtnText}/> 
           <Btn handlePress={()=>{handleChangePage(3)}} color="bg-blue-500" text="New Category"/> 
           <Btn handlePress={()=>{handleChangePage(1)}} color="bg-btn-gradient" text="Quit Game"/> 
        </div>
      </div>
    </GameCard>
  </div>
  )
}

const Game:React.FC<any> = ({width,page,handleChangePage,category}) => {
  const [letters,setLetters] = useState(new Array(26).fill(0).map((_,idx)=>({id:idx,letter:String.fromCharCode(65 + idx),isPressed:false})));
  const [words,setWords] = useState([])
  const [winningWord,setWinningWord] = useState<any>(null)
  const [wordTiles,setWordTiles] = useState<any>([])
  const [lifeBar,updateLifeBar] = useState(20);
  const [gameState,setGameState] = useState<any>(null)
  const [score,setScore] = useState(0);
  const [points,setPoints] = useState(100);
  const priorRef = useRef<any>();


  useEffect(()=>{
    if(!category)handleChangePage(1)
    fetch("data.json")
    .then(res=>res.json())
    .then(res=>{
      // console.log("Res",res.categories);
      for(let i in res.categories){
        if(i == category){
          console.log(i, category);
            setWords(res.categories[i]);
        }
      }
    })
  },[])

  useEffect(()=>{
    if(words.length && !winningWord){
      // console.log('choose a word!')
      let random = Math.random() * words.length | 0;
      let tempWinningWord:any = words[random];
      console.log(tempWinningWord)
      setWinningWord(tempWinningWord?.name.replaceAll(" ",""))
      serializeToTiles(tempWinningWord?.name)
    }


  },[words]);

  useEffect(()=>{
    if(gameState == "reset"){
      let random = Math.random() * words.length | 0;
      let tempWinningWord:any = words[random];
      setWinningWord(tempWinningWord?.name.replaceAll(" ",""))
      serializeToTiles(tempWinningWord?.name)
      setLetters((letters)=>letters.map(l=>({...l,isPressed:false})))
      setGameState(null)
      updateLifeBar(100);

    }
  },[gameState])

  const handlePause = ()=>{
    // handleChangePage(1);
    setGameState("pause")
  }


  const serializeToTiles = (winningWord:any)=>{
    // console.log("WinningWord",winningWord);
    let wordArr=[]
    let totalArr = []
    for(let i=0;i<winningWord.length;i++){

          if(winningWord[i] == " "){
              totalArr.push({id:totalArr.length+1,arr:wordArr});
              wordArr = [];
              continue;
          }
          wordArr.push({id:i+1,letter:winningWord[i],isSelected:false});
    }
    totalArr.push({id:totalArr.length+1,arr:wordArr});
    setWordTiles(totalArr);
    // console.log(totalArr)
  }


  const handleChooseLetter=(letter:any)=>{
    setLetters((letters=>letters.map(l=>l.letter == letter ? {...l,isPressed:true} : l)));

    if(winningWord.toLowerCase().indexOf(letter.toLowerCase()) == -1){
      console.log("valid guess. letter exists in winning word");
      let temp = lifeBar - 10;
      updateLifeBar(temp);
      setPoints((points)=>points=points-10);
      if(temp == 0){
        setTimeout(()=>{
        gameOver("lose")
        },1500)
      }
        return;
    }
    setWordTiles((wordTiles:any)=> wordTiles.map((wordArr:any)=>({...wordArr,arr:wordArr.arr.map((word:any)=> 
      word.letter.toLowerCase() == letter.toLowerCase() ? {...word,isSelected:true} : word)})))
    
    
    let string = "";
    let changed = wordTiles.map((wordArr:any)=>({...wordArr,arr:wordArr.arr.map((word:any)=> 
      word.letter.toLowerCase() == letter.toLowerCase() ? {...word,isSelected:true} : word)}));

    changed.forEach((arr:any)=>{
      arr.arr.forEach((letter:any)=>{
        if(letter.isSelected)string += letter.letter
        if(letter.letter == " ")string += letter.letter
      })
    })

    console.log("String",string,winningWord);
    if(priorRef.current?.length){
    let diff = Math.abs(priorRef.current.length - string.length);
    // priorRef.current = string;
    setScore((score)=>score=score + (points * diff));

    }
    else{
      let diff = string.length;
      setScore((score)=>score=points * diff);

    }
    priorRef.current = string;
    setPoints(100)

    if(string == winningWord){
      // console.log("player has won!!")
      setTimeout(()=>{
        gameOver("win")
        },1750)    }
  }


  const gameOver=(conclusion:any)=>{
    console.log("Conclusion",conclusion)
    setGameState(conclusion)
  }





  return (
    <div className={`view-container`}>


      <GameScreen header="Paused" handleChangePage={handleChangePage} setGameState={setGameState} topBtnText="continue" gameState={gameState} renderValue="pause"/>
      <GameScreen header="You Win" handleChangePage={handleChangePage} setGameState={setGameState} topBtnText="play again" gameState={gameState} renderValue="win"/>
      <GameScreen header="You Lose" handleChangePage={handleChangePage} setGameState={setGameState} topBtnText="play again" gameState={gameState} renderValue="lose"/>



      <div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 md:gap-10 items-center">
          <GradientBtn img="/images/icon-menu.svg" size={width > 750 ? 94 : 64}  imgSize={width > 750 ? 45 : 35} handlePress={handlePause}/>
          <h1 className="text-3xl md:text-8xl text-white">{category}</h1>
          </div>
          <div>
          <div className="flex items-center gap-5">
            <div>
              <div className="relative w-[125px] md:w-[200px] h-5 bg-white rounded-full flex items-center px-2">
                <div style={{width:`${lifeBar}%`, transition:'.5s ease',backgroundColor:`rgb(${100-lifeBar},15,${150 - lifeBar})`}} className={`relative h-3 rounded-full bg-dark-gray`}></div>
              </div>
            </div>
            <div className={`h-[30px] w-[30px] md:h-[40px] md:w-[40px] relative ${lifeBar == 0 ? 'player-died-animation' : ''}`}>
              <Image src="./images/icon-heart.svg" fill alt="img"/>
            </div>
            </div>
            <h5 className="text-xl text-white">Score:<CountUp end={score} duration={1}/>
             </h5>

          </div>
        </div>
      </div>


      <div className="flex gap-4 md:gap-10 my-4 md:my-10 flex-wrap">
        {wordTiles.length > 0 && wordTiles.map((wordArr:any,idx:any)=>
      
          <div className="flex flex-wrap gap-2 md:gap-4 mx-3 md:mx-10" key={idx}>
           {wordArr.arr.map((letter:any,index:any)=>(
          <LetterPanel key={letter.id} letter={letter.letter} isSelected={letter.isSelected} delay={index/4}/>
           
           ))}
           </div>
           
           )}

      </div>
      <div className="grid grid-cols-9 gap-2 md:gap-5 mt-10">
        {letters.map(letter=>(
          <LetterBtn handleChooseLetter={handleChooseLetter} key={letter.id} letter={letter}/>
          ))}
      </div>
    </div>
  )
}

export default Game


