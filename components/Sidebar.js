import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { AiTwotoneHome ,AiFillBell ,AiFillMail} from "react-icons/ai";
import { FaHashtag, FaUser } from "react-icons/fa";
import { BsClipboard, BsFillBookmarkFill } from "react-icons/bs";
import { CgMoreO ,CgBorderStyleDashed } from "react-icons/cg";
import { useSession ,signIn ,signOut } from "next-auth/react";

export default function Sidebar() {
  const {data:session } = useSession()
  return (
    <div className='hidden sm:flex flex-col  fixed h-full bg-slate-50'>
        {/* comany logo */}
        <div className="hoverEffect mt-1">
            <Image width="50" height="50" src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" alt="Comany logo" />
        </div>
       

        {/* menu */}
        <div className=" mt-1  mb-1 lg:items">
        <SidebarMenuItem text="Home" Icon={AiTwotoneHome} active/>
        <SidebarMenuItem text="Explor" Icon={FaHashtag}/>
       
        {session &&(
          <>
          <SidebarMenuItem text="Notification" Icon={AiFillBell}/>
          <SidebarMenuItem text="Messages" Icon={AiFillMail}/>
          <SidebarMenuItem text="Bookmark" Icon={BsFillBookmarkFill}/>
          <SidebarMenuItem text="List" Icon={BsClipboard}/>
          <SidebarMenuItem text="User" Icon={FaUser}/>
          <SidebarMenuItem text="More" Icon={CgMoreO}/>
          </>
        )}
       
       
        </div>


        {/* button */}
        {
          session ? (
            <>
            <button className='bg-blue-400 rounded-full text-white w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden lg:inline'>Tweet</button>

            {/* mini profile */}
            <div className="hoverEffect flex items-center text-gray-700 justify-center lg:justify-start mt-5">
                <Image 
                onClick={signOut}
                src={session.user.image}
                 width="50" height="50" alt="content"
                 className="rounded-full w-10 h-10 mx-2"
                 ></Image>
                <div className="hidden lg:inline">
                    <h5 className="font-bold ml-2"
                   >{session.user.name}</h5>
                    <p className="text-gray-500 ml-2">@{session.user.username}</p>
                   
                </div>
                <CgBorderStyleDashed className="ml-8"/>
            </div>
            </>
          ):(
            <button onClick={signIn} className='bg-blue-400 rounded-full text-white w-36  font-bold shadow-md hover:brightness-95 text-lg hidden lg:inline'> Signin</button>
          )
        }
       

    </div>
  )
}
