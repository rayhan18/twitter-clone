

import { HiOutlineSparkles } from "react-icons/hi";
import Inputfilld from "./Inputfilld";
import Post from "./Post"

const posts =[
    {
        id:"1",
        name: "Feedes",
       username:'Rayhan',
        postimg:'https://www.eyeofriyadh.com/news_images/2016/12/2307f1b13af25.jpg',
        userImg:'https://i.insider.com/5dcc135ce94e86714253af21?width=1000&format=jpeg&auto=webp',
        timestamps:'2h ago',
        text:'nice view'
    },
    {
        id:"2",
        name: "Feedes 2",
       username:'Rimon',
       postimg:'https://www.eyeofriyadh.com/news_images/2016/12/2307f1b13af25.jpg',
        userImg:'https://i.insider.com/5dcc135ce94e86714253af21?width=1000&format=jpeg&auto=webp',
        timestamps:'2h ago',
        text:'nice view'
    },
]

export default function Feedes() {
    

  //console.log(posts)

  return (
    <div className='lg:ml-[230px] border-l border-r lg:min-w-[500px] sm:ml[70px] flex-grow max-w-lg'>
       
        <div className='flex sticky px-2 py-2 top-0 z-50  bg-white border-b border-gray-200'>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
            <div className='hover:bg-gray-200 rounded-full flex items-center justify-center px-0 ml-auto'>
                <HiOutlineSparkles />
            </div>
        </div>
        <Inputfilld/>
        { posts.map((postdata)=>(
            
              <Post key={postdata.id} allpostdata={postdata}/>
            ))}

     
    </div>
  )
}
