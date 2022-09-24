

import { HiOutlineSparkles } from "react-icons/hi";
import Inputfilld from "./Inputfilld";
import Post from "./Post"
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { AnimatePresence, motion } from "framer-motion";
import PostPage from "./Post";


export default function Feedes() {
const [posts ,setPosts] = useState([])

useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );

  return (
    <div className='lg:ml-[230px] border-l border-r lg:min-w-[500px] sm:ml[70px] flex-grow max-w-lg'>
       
        <div className='flex sticky px-2 py-2 top-0 z-50  bg-white border-b border-gray-200'>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
            <div className='hover:bg-gray-200 rounded-full flex items-center justify-center px-0 ml-auto'>
                <HiOutlineSparkles />
            </div>
        </div>
        <Inputfilld/>
        <AnimatePresence>
        { posts.map((postdata)=>(
            <motion.div  key={postdata.id} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            >
                <PostPage  key={postdata.id} id={postdata.id} allpostdata={postdata}/>
            </motion.div>
             
           
          ))}

        </AnimatePresence>
       
     
    </div>
  )
}
