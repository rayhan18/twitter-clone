import { useRecoilState} from 'recoil'
import {modalState, postIdState} from '../atom/ComponentAtom'
import Modal from 'react-modal';
import { ImCross } from "react-icons/im";
import Moment from "react-moment";
import { useEffect, useState } from 'react';
import {  addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { HiPhotograph,HiOutlineEmojiHappy } from "react-icons/hi";
import { useRouter } from 'next/router';
import { userState } from '../atom/userAtom';
import { useSession } from 'next-auth/react';




export default function CommandMudol() {
    const [open ,setOpen] = useRecoilState(modalState)
    const [postId] = useRecoilState(postIdState)
    const [post ,setPost] = useState({})
    const [input, setInput] = useState("");
    const router = useRouter();
    const [currentUser] = useRecoilState(userState);
    const {data:session} = useSession();

    useEffect(() => {
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot);
      });
    }, [postId, db]);


async function sendCommand(){
  await addDoc(collection(db, "posts",postId ,'comments' ),{
    comment:input ,
    name: session.user.name,
     username: session.user.username,
     userImg: session.user.image,
     timestamp:serverTimestamp()
  })
  setOpen(false)
  setInput("")
  router.push(`posts/${postId}`)
}


  return (
    <div>
    {open && (
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        className="max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md"
      >
        <div className="p-1">
          <div className="border-b border-gray-200 py-2 px-1.5">
            <div
              onClick={() => setOpen(false)}
              className="hoverEffect w-10 h-10 flex items-center justify-center"
            >
              <ImCross className="h-[23px] text-gray-700 p-0" />
            </div>
          </div>
          <div className="p-2 flex items-center space-x-1 relative">
            <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
            <img
              className="h-11 w-11 rounded-full mr-4"
              src={post?.data()?.userImg}
              alt="user-img"
            />
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post?.data()?.name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post?.data()?.username} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>

{/* /////// */}

              <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
                {post?.data()?.text}
              </p>
       
        <div className='flex border-b p-3 border-gray-200 space-x-3'>
           <div>
            <img src={session.user.image}
                width="40" height="40" alt="user"
                className="rounded-full w-10 h-10 mx-2 cursor-pointer hover:brightness-95"
                />
            </div>
       
             <div className='w-full divide-y divide-gray-200'>
                <div className="tracking">
                <textarea className="w-full border-none focus:ring-0 text-lg placeholder-gray-400 tracking-wide min-h-[50px] text-gray-700" rows='2'
                 placeholder="Tweet your reply?"
                 value={input }
                 onChange={e => setInput(e.target.value)}
                 >

                 </textarea>
                </div>
              </div>

             </div>
            

           
              <div className='flex items-center justify-between pt-2.5 border-b pb-1'>
                  <div className='flex'>
                    <div
                    //  onClick={()=>filePikerRef.current.click()}
                     >
                    <HiPhotograph className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                    {/* <input type='file' hidden ref={filePikerRef} 
                    onChange={addImagetoHook}/> */}
                    </div>
                     
                      <HiOutlineEmojiHappy className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                    
                  </div>
                    <button onClick={sendCommand} disabled={!input.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Reply</button>
                </div>
             
             








          {/* <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
            {post?.data()?.text}
          </p>

          <div className="flex  p-3 space-x-3">
            <img
         
              // src={currentUser.userImg}
              alt="user-img"
              className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
            />
            <div className="w-full divide-y divide-gray-200">
              <div className="">
                <textarea
                  className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                  rows="2"
                  placeholder="Tweet your reply"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2.5">
                <div className="flex">
                  <div
                    className=""
                    onClick={() => filePickerRef.current.click()}
                  >
                    <HiPhotograph className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                    <input
                      type="file"
                      hidden
                      // ref={filePickerRef}
                      // onChange={addImageToPost}
                    />
                  </div>
                  <HiOutlineEmojiHappy className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                </div>
                <button
                  // onClick={sendComment}
                  // disabled={!input.trim()}
                  className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                >
                  Reply
                </button>
              </div>
            </div>
          </div> */}



        </div>
      </Modal>
    )}
  </div>
  )
}
