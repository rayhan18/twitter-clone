import { AiOutlineVerticalLeft } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import News from "./News";
import { useState } from "react";

export default function Wedget({newResult,randomUsersResults}) {
    const [articleNum,setArticleNum] = useState(3)
    const [randomusernum,setrandomUserNum] = useState(3)



  return (
    <div className="lg:w-[700px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] lg:w-[95%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full  relative">
       
            <BsSearch  className="h-5 z-50 text-gray-500" />
            <input
            className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 "
            type="text"
            placeholder="Search Twitter"
          />
        </div>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <p className="font-bold  px-4">Whats happening</p><hr/>
            {newResult.slice(0,articleNum).map(article=>(
        <News key={article.id} article={article}/>
      ))}
      <button onClick={()=> setArticleNum(articleNum + 3)}  className="text-blue-300 pl-4 pb-3 hover:text-blue-400">Show more</button>
        </div>
  {/* random users */}
        <div className="text-gray-700 space-y-3">
            <h6 className="font-bold text-lg px-4">Who to floow me</h6>
                {randomUsersResults.slice(0,randomusernum).map(randomuser=>(
                    <div key={randomuser.login.username} className="flex items-center border-b px-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out">
                       <div>
                       <img className="rounded-full w-10" src={randomuser.picture.thumbnail} alt="user"/>
                       </div>
                        <div className="truncate  ml-4 leading-5">
                            <p className="font-bold hover:underline text-[14px] truncate">{randomuser.login.username}</p>
                            <p>{randomuser.name.first + " "+ randomuser.name.last}</p>
                           
                        </div>
                        <button className="ml-auto bg-blue-500 text-white rounded-full text-sm px-3.5 py-1.5 font-bold">Follow</button>
                       
                    </div>
                ))}
            <button onClick={()=>setrandomUserNum(randomusernum + 3)} className="ml-auto bg-blue-600 text-white rounded-full text-sm px-3.5 py-1.5 font-bold">Show more</button>
        </div>
     
    </div>
  )
}
