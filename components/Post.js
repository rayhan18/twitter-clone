
import { async } from "@firebase/util";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsChat, BsHeart, BsShare, BsTrash } from "react-icons/bs";
import { CgChart } from "react-icons/cg";
import { HiDotsHorizontal } from "react-icons/hi";
import Moment from "react-moment";
import { db } from "../firebase";
import { AiFillHeart ,AiOutlineHeart} from "react-icons/ai";


export default function Post({allpostdata}) {
 const {data:session} = useSession()
 const [likes ,setLikes] = useState([])
 const [hasLikes ,setHasLikes] = useState(false)

 useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "posts", allpostdata.id, "likes"),
    (snapshot) => setLikes(snapshot.docs)
  );
}, [db]);


useEffect(() => {
  setHasLikes(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
}, [likes]);





  async function likePost(){
    if(session){
      if(hasLikes){
        await deleteDoc(doc(db, "posts",allpostdata.id ,'likes',session?.user.uid))
      }else{
        await setDoc(doc(db, "posts",allpostdata.id ,'likes' ,session?.user.uid),{
          username: session.user.username
        })
      }
    }else{
      signIn()
    }
    
    
  }
  return (
 <div className="flex p-3 cursor-pointer border-b border-gray-200">
 
 {/* // post user images */}
 <div className="mr-4">
 <img className='rounded-full  cursor-pointer hover:brightness-95 mt-3' 
 src={allpostdata?.data()?.userImg} width="80" height="80" alt="user" />
 </div>
      

{/* //post right site */}
    <div className="">
      {/* header */}
       <div className="flex items-center justify-between">
         {/* post info */}
           <div className="flex items-center space-x-1 whitespace-nowrap">
             <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{allpostdata.data().name}</h4>
             <span className="text-sm sm:text-[12px]">@{allpostdata.data().username}</span>
             <span className="text-sm sm:text-[12px] hover:underline"> 
             <Moment fromNow>{allpostdata?.data().timestamp?.toDate()}</Moment>
             </span>
           </div>
           {/* dot icon */}
       <HiDotsHorizontal  className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2"/>
       </div>
       
        <div>

        </div>
          {/* post text  */}
          <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">{allpostdata.data().text}</p>
          {/* post images  */}
          <img className="rounded-2xl mr-2" src={allpostdata.data().image} alt="" />
          {/* icons */}
          <div className="flex justify-between text-gray-500 p-2">
            <BsChat className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
            <div className="flex items-center">
            {hasLikes ?(
              <AiFillHeart onClick={likePost} className="h-9 w-9 hoverEffect p-2 text-red-500 hover:bg-sky-100"/>
            ):(
              <AiOutlineHeart onClick={likePost} className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-sky-100"/>
            )}
            {likes?.length > 0 && <span className={`${hasLikes && 'text-red-600 text-sm '}select-none`} >{likes.length}</span>}
            </div>
            
           
           {/* <AiOutlineHeart onClick={likePost} className="h-9 w-9 hoverEffect p-2  hover:bg-sky-100"/> */}
            <BsTrash className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100"/>
            <BsShare className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
            <CgChart className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
          </div>
    </div>
 </div>
   
  )
}
