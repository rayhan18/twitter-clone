import Image from "next/image";
import { BsEmojiSmile, BsX } from "react-icons/bs";
import { CgPhotoscan } from "react-icons/cg";
import { useSession,signOut } from "next-auth/react";
import { useRef, useState } from "react";
import { db,storage } from "../firebase";
import { addDoc,collection ,serverTimestamp ,updateDoc, doc} from "firebase/firestore";
import { ref ,uploadString,getDownloadURL} from "firebase/storage";

export default function Inputfilld() {
  const {data:session } =useSession()
  const [input ,setInput] = useState("")
 // console.log(session)
 const [loading,setLoading] =useState(false)
const filePikerRef = useRef(null)
const [selectedfile ,setSellectedfile] =useState(null)

const sendPost= async ()=>{
  if(loading) return
  setLoading(true)

  const docRef = await addDoc(collection(db , 'posts'),{
    id:session.user.uid,
    text: input,
    userImg:  session.user.image,
    timestamp: serverTimestamp(),
    name: session.user.name,
    username: session.user.username,
 })
 const imageRef = ref(storage, `posts/${docRef.id}/image`);
 if (selectedfile) {
  await uploadString(imageRef, selectedfile, "data_url").then(async () => {
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(db, "posts", docRef.id), {
      image: downloadURL,
    });
  });
}

  setInput("")
  setSellectedfile(null)
  setLoading(false)
}
const addImagetoHook=(e)=>{
  const reder =new FileReader()
  if(e.target.files[0]){
    reder.readAsDataURL(e.target.files[0])
  }
  reder.onload =(rederEvent)=>{
    setSellectedfile(rederEvent.target.result)
  }
  
}
  return (
    <div >
      {session &&(
        <>
        <div className='flex border-b p-3 border-gray-200 space-x-3'>
           <div>
            <Image onClick={signOut} src={session.user.image}
                width="40" height="40" alt="user"
                className="rounded-full w-10 h-10 mx-2 cursor-pointer hover:brightness-95"
                ></Image>
            </div>
       
             <div className='w-full divide-y divide-gray-200'>
                <div className="tracking">
                <textarea className="w-full border-none focus:ring-0 text-lg placeholder-gray-400 tracking-wide min-h-[50px] text-gray-700" rows='2'
                 placeholder="what's happen?"
                 value={input }
                 onChange={e => setInput(e.target.value)}
                 >

                 </textarea>
                </div>
              </div>

             </div>
            {selectedfile && (
              <div className="relative">
                <BsX onClick={()=> setSellectedfile(null)}
                 className="bg-red-500 text-white absolute h-10 w-10"/>
                <img  src={selectedfile} className={`${loading && "animate-pulse"} `}/>
              </div>
            )}

            {!loading && (
              <>
              <div className='flex items-center justify-between pt-2.5 border-b pb-1'>
                  <div className='flex'>
                    <div onClick={()=>filePikerRef.current.click()}>
                    <CgPhotoscan className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                    <input type='file' hidden ref={filePikerRef} 
                    onChange={addImagetoHook}/>
                    </div>
                     
                      <BsEmojiSmile className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                    
                  </div>
                    <button onClick={sendPost} disabled={!input.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Twitte</button>
                </div>
              </>
            )}
             
             </>
      )}
        
             
      
    </div>
  )
}
