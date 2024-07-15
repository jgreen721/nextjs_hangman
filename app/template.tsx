"use client"
import React from 'react'
import {motion} from "framer-motion"


const Template = ({children}:any) => {
  return (
    <motion.div initial={{translateY:"0%"}} animate={{translateY:"0%"}} transition={{type:"spring"}}  className="h-full w-full absolute z-75">
        {children}
    </motion.div>
  )
}

export default Template