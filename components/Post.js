
import { BsChat, BsHeart, BsShare, BsTrash } from "react-icons/bs";
import { CgChart } from "react-icons/cg";
import { HiDotsHorizontal } from "react-icons/hi";




export default function Post({allpostdata}) {
  //console.log(props.allpostdata)
  return (
 <div className="flex p-3 cursor-pointer border-b border-gray-200">
 
 {/* // post user images */}
 <div className="mr-4">
 <img className='rounded-full  cursor-pointer hover:brightness-95 mt-3' src={allpostdata.userImg} width="80" height="80" alt="user" />
 </div>
      

{/* //post right site */}
    <div className="">
      {/* header */}
       <div className="flex items-center justify-between">
         {/* post info */}
           <div className="flex items-center space-x-1 whitespace-nowrap">
             <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{allpostdata.name}</h4>
             <span className="text-sm sm:text-[12px]">@{allpostdata.username}</span>
             <span className="text-sm sm:text-[12px] hover:underline"> 2h ago</span>
           </div>
           {/* dot icon */}
       <HiDotsHorizontal  className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2"/>
       </div>
       
        <div>

        </div>
          {/* post text  */}
          <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">{allpostdata.text}</p>
          {/* post images  */}
          <img className="rounded-2xl mr-2" src={allpostdata.postimg} alt="" />
          {/* icons */}
          <div className="flex justify-between text-gray-500 p-2">
            <BsChat className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
            <BsHeart className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
            <BsTrash className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100"/>
            <BsShare className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
            <CgChart className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
          </div>
    </div>
 </div>
   
  )
}
