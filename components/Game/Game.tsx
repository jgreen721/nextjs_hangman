"use client"
import React, {useEffect,useState} from 'react'
import "../components_styles.css"
import { GradientBtn } from '@/reusables'
import {motion} from "framer-motion"
import Image from "next/image"

const LetterBtn = ({letter,handleChooseLetter}:any)=>{

  return (
<button disabled={letter.isPressed} onClick={()=>handleChooseLetter(letter.letter)} className="relative text-xl md:text-4xl text-custom-darkpurple min-w-[35px] min-h-[35px]">
  <div className={`absolute z-20 ${letter.isPressed ? 'bg-white opacity-75' : 'bg-white'} w-full h-full top-0 rounded-[14px]`}></div>
  <div className="absolute w-full h-full bg-purple-500 top-[2px] rounded-[14px]"></div>

  <div className="relative z-30 flex items-center justify-center p-2">
  <h5 className="text-xl md:text-4xl text-custom-darkpurple">{letter.letter}</h5>
  </div>

</button>
  )
}


const LetterPanel = ({letter,delay,isSelected}:any)=>{




  return (
    <motion.div initial={{translateY:"-50px",scaleY:0}} animate={{translateY:0,scaleY:1}} transition={{type:"spring",delay}} style={{"--i":`${delay}s`} as any} className={`${letter.isSelected ? 'bg-white opacity-20' : 'bg-blue-500 opacity-100'}  p-4 md:p-8 flex items-center justify-center rounded-[25%] border-2 border-black ${letter == " " ? "opacity-0" : "opacity-100"} `}>
      <h1 className={`text-3xl md:text-7xl text-white uppercase transition duration-1 ease-in ${isSelected ? 'animate-correct-letter' : 'opacity-0'}`}>{letter}</h1>
    </motion.div>
  )
}

const Game:React.FC<any> = ({page,handleChangePage,category}) => {
  const [letters,setLetters] = useState(new Array(26).fill(0).map((_,idx)=>({id:idx,letter:String.fromCharCode(65 + idx),isPressed:false})));
  const [words,setWords] = useState([])
  const [winningWord,setWinningWord] = useState(null)
  const [wordTiles,setWordTiles] = useState<any>([])
  const [width,setWidth] = useState(1040)
  const [percent,setPercent] = useState(100)


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
    setWidth(window.innerWidth);
  },[])

  useEffect(()=>{
    if(words.length && !winningWord){
      // console.log('choose a word!')
      let random = Math.random() * words.length | 0;
      let tempWinningWord:any = words[random];
      // console.log(tempWinningWord?.name)
      setWinningWord(tempWinningWord?.name.replaceAll(" ",""))
      determineLength(tempWinningWord?.name)
      // setWordTiles(tempWinningWord.name.split("").map((letter:any,idx:number)=>({id:idx+1,letter,isSelected:false})));
    }


  },[words]);

  const handlePause = ()=>{
    handleChangePage(1);
  }


  const determineLength = (winningWord:any)=>{
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
    setPercent((percent)=>percent = percent-10);
    setWordTiles((wordTiles:any)=> wordTiles.map((wordArr:any)=>({...wordArr,arr:wordArr.arr.map((word:any)=> 
      word.letter.toLowerCase() == letter.toLowerCase() ? {...word,isSelected:true} : word)})))
    setLetters((letters=>letters.map(l=>l.letter == letter ? {...l,isPressed:true} : l)));
    
    
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
    if(string == winningWord){
      console.log("player has won!!")
    }
  }


  return (
    <div className={`view-container`}>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex gap-10 items-center">
          <GradientBtn img="/images/icon-menu.svg" size={width > 750 ? 94 : 64}  imgSize={width > 750 ? 45 : 35} handlePress={handlePause}/>
          <h1 className="text-3xl md:text-8xl text-white">{category}</h1>
          </div>
          <div className="flex items-center gap-5">
            <div>
              <div className="relative w-[200px] h-5 bg-white rounded-full flex items-center px-2">
                <div style={{width:`${percent}%`, transition:'.5s ease',backgroundColor:`rgb(${100-percent},15,${150 - percent})`}} className={`relative h-3 rounded-full bg-dark-gray`}></div>
              </div>
            </div>
            <div className={`h-[40px] w-[40px] relative`}>
              <Image src="./images/icon-heart.svg" fill alt="img"/>
            </div>
          </div>
        </div>
      </div>


      <div className="flex gap-10 my-10 flex-wrap">
        {wordTiles.length > 0 && wordTiles.map((wordArr:any,idx:any)=>
      
          <div className="flex flex-wrap gap-2 md:gap-4 mx-5 md:mx-10" key={idx}>
           {wordArr.arr.map((letter:any,index:any)=>(
          <LetterPanel key={letter.id} letter={letter.letter} isSelected={letter.isSelected} delay={index/4}/>
           
           ))}
           </div>
           
           )}

      </div>
      <div className="grid grid-cols-9 gap-2 md:gap-5">
        {letters.map(letter=>(
          <LetterBtn handleChooseLetter={handleChooseLetter} key={letter.id} letter={letter}/>
          ))}
      </div>
    </div>
  )
}

export default Game


