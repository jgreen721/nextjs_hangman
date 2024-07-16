import React from 'react'
import {Header,GradientBtn} from "@/reusables"
import "../components_styles.css"
import {motion} from "framer-motion"

const CategoryCard = ({category,handleChangePage,setCategory,delay}:any)=>{


  const handleSelectCategory=()=>{
    setCategory(category.name)
    handleChangePage(4)
  }

  return(
    <div className="relative overflow-hidden">
    <motion.div initial={{translateY:"-100%"}} animate={{translateY:"0%"}} transition={{type:"spring",delay}} onClick={handleSelectCategory} className="bg-custom-blue border-t-8 border-blue-500 transition ease-in hover:bg-lightblue hover:scale-[1.02] p-4 md:h-[190px] md:p-10 flex items-center justify-center rounded-[40px] cursor-pointer shadow-category-card-inset">
      <h2 className="text-3xl md:text-5xl text-white font-semibold text-center drop-shadow drop-shadow-[20px] uppercase tracking-custom-spacing">{category.name}</h2>
    </motion.div>
    </div>
  )
}


const Categories:React.FC<any> = ({page,handleChangePage,setCategory,width}) => {


  const categories = [
    {id:1,name:"Movies"},
    {id:2,name:"TV Shows"},
    {id:3,name:"Countries"},
    {id:4,name:"Capital Cities"},
    {id:5,name:"Animals"},
    {id:6,name:"Sports"},
  ]
  return (
    <div className={`view-container`}>
         <div className="flex justify-between items-center md:justify-start w-full  relative">
          <GradientBtn img="images/icon-back.svg" size={width > 750 ? 94 : 64} imgSize={width > 750 ? 45 : 35} handlePress={()=>handleChangePage(1)}/>
        <div className="md:absolute md:w-full text-center">
          <Header isHeader={true}>Categories</Header>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-12">
        {categories.map(category=>(
          <CategoryCard delay={category.id * .25} setCategory={setCategory} handleChangePage={handleChangePage} key={category.id} category={category}/>
        ))}
      </ul>
    </div>
  )
}

export default Categories