
import { async } from "@firebase/util";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsChat, BsHeart, BsShare, BsTrash } from "react-icons/bs";
import { CgChart } from "react-icons/cg";
import { HiDotsHorizontal } from "react-icons/hi";
import Moment from "react-moment";
import { db, storage } from "../firebase";
import { AiFillHeart ,AiOutlineHeart} from "react-icons/ai";
import { deleteObject, ref } from "firebase/storage";
import {useRecoilState} from 'recoil'
import {modalState ,postIdState } from '../atom/ComponentAtom'
import { useRouter } from "next/router";

export default function GetComment({comment ,commentId ,originalPostId ,name,uname,uimg}) {
  //console.log(originalPostId.name ,'com')
 const {data:session} = useSession()
 const [likes ,setLikes] = useState([])
//  const [comments ,setComments] = useState([])
 const [hasLikes ,setHasLikes] = useState(false)
const [open , setOpen] = useRecoilState(modalState)
const [postId , setPostId] = useRecoilState(postIdState)
const router = useRouter()

 useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "posts", originalPostId, "comments",commentId, "likes"),
    (snapshot) => setLikes(snapshot.docs)
  );
}, [db,commentId,originalPostId]);

// useEffect(() => {
//   const unsubscribe = onSnapshot(
//     collection(db, "posts", id, "comments"),
//     (snapshot) => setComments(snapshot.docs)
//   );
// }, [db]);

useEffect(() => {
  setHasLikes(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
}, [likes]);





  async function likeComment(){
    if(session){
      if(hasLikes){
        await deleteDoc(doc(db, "posts",originalPostId ,'comments',commentId, 'likes',session?.user.uid))
      }else{
        await setDoc(doc(db, "posts",originalPostId , 'comments', commentId,'likes' ,session?.user.uid),{
          username: session.user.username
        })
      }
    }else{
      signIn()
    }  
  }

  //some error here 
  async function deleteComments(){
    if(window.confirm('Are you sure you want to delete this post?')){
      deleteDoc(doc(db, "posts",originalPostId , 'comment', commentId ))
      //  if(allpostdata?.data().image){
      //   deleteObject(ref(storage,`posts${id}/image`))
      // }
      // router.push('/')
    }
   
     
  }

 





  return (
 <div className="flex p-3 cursor-pointer border-b border-gray-200 pl-2">
 
 {/* // post user images */}
 <div className="mr-4">
 <img className='rounded-full  cursor-pointer hover:brightness-95 mt-3' 
 src={uimg} width="80" height="80" alt="user" />
 </div>
      

{/* //post right site */}
    <div className="">
      {/* header */}
       <div className="flex items-center justify-between">
         {/* post info */}
           <div className="flex items-center space-x-1 whitespace-nowrap">
             <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{name}</h4>
             <span className="text-sm sm:text-[12px]">@{uname}</span>
             <span className="text-sm sm:text-[12px] hover:underline"> 
             <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
             </span>
           </div>
           {/* dot icon */}
       <HiDotsHorizontal  className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2"/>
       </div>
       
        <div>

        </div>
          {/* post text  */}
          <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">{comment}</p>
          {/* post images  */}
          {/* <img className="rounded-2xl mr-2" src={comment?.image} alt="" /> */}
          {/* icons */}
          <div className="flex justify-between text-gray-500 p-2">
            <div className="flex items-center select-none">
            <BsChat
             onClick={()=>{
              if(!session){
                signIn()
              }else{
                setPostId(originalPostId)
                setOpen(!open)
              }
             
            } }

             className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
            {/* {comments.length > 0 &&(
              // <span className="text-sm">{comments.length}</span>
            )} */}
            </div>
           
            <div className="flex items-center">
            {hasLikes ?(
              <AiFillHeart onClick={likeComment} className="h-9 w-9 hoverEffect p-2 text-red-500 hover:bg-sky-100"/>
            ):(
              <AiOutlineHeart onClick={likeComment} className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-sky-100"/>
            )}
            {likes?.length > 0 && <span className={`${hasLikes && 'text-red-600 text-sm '}select-none`} >{likes.length}</span>}
            </div>

             {session?.user.uid === comment?.userId &&(
             <BsTrash onClick={deleteComments} className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100"/>
           )}
          
            <BsShare className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
            <CgChart className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
          </div>
    </div>
 </div>
   
  )
}
