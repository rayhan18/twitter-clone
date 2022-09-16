
import { HiOutlineSparkles } from "react-icons/hi";
import Inputfilld from "./Inputfilld";

export default function Feedes() {
  return (
    <div className='lg:ml-[230px] border-l border-r lg:min-w-[500px] sm:ml[70px] flex-grow max-w-lg'>
       
        <div className='flex sticky px-2 py-2 top-0 z-50  bg-white border-b border-gray-200'>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
            <div className='hover:bg-gray-200 rounded-full flex items-center justify-center px-0 ml-auto'>
                <HiOutlineSparkles />
            </div>
        </div>
        <Inputfilld/>
    </div>
  )
}
