import Image from "next/image";
import { BsEmojiSmile } from "react-icons/bs";
import { CgPhotoscan } from "react-icons/cg";


export default function Inputfilld() {
  return (
    <div >
        <div className='flex border-b p-3 border-gray-200 space-x-3'>

       
        <div>
        <Image src="https://i.insider.com/5dcc135ce94e86714253af21?width=1000&format=jpeg&auto=webp"
             width="30" height="30" alt="user"
             className="rounded-full w-10 h-10 mx-2 cursor-pointer hover:brightness-95"
             ></Image>
        </div>
       
             <div className='w-full divide-y divide-gray-200'>
                <div className="">
                <textarea className="w-full border-none focus:ring-0 text-lg placeholder-gray-400 tracking-wide min-h-[50px] text-gray-700" rows='2' placeholder="what's happen?"></textarea>
                </div>
                </div>  
     </div> 
             <div className='flex items-center justify-between pt-2.5 border-b pb-1'>
                <div className='flex'>
                    <CgPhotoscan className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                    <BsEmojiSmile className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                   
                </div>
                <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Twitte</button>
             </div>
      
    </div>
  )
}
